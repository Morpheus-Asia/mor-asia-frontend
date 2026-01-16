import { NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email } = body;

    if (action === 'register') {
      // Validate email
      if (!email) {
        return NextResponse.json(
          { error: 'Email is required' },
          { status: 400 }
        );
      }

      // Step 1: Register the user in Strapi
      // Generate a random password for passwordless auth
      const randomPassword = Math.random().toString(36).slice(-16) + Math.random().toString(36).slice(-16);
      
      const registerResponse = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          email: email,
          password: randomPassword,
        }),
      });

      const registerData = await registerResponse.json();

      if (!registerResponse.ok) {
        // Check if user already exists
        if (registerData.error?.message?.includes('already taken') || 
            registerData.error?.message?.includes('already exists')) {
          // User exists, just send confirmation email
          const sendEmailResponse = await fetch(`${STRAPI_URL}/api/auth/send-email-confirmation`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
            }),
          });

          if (!sendEmailResponse.ok) {
            const emailError = await sendEmailResponse.json();
            console.error('Error sending confirmation email:', emailError);
            return NextResponse.json(
              { error: 'Failed to send confirmation email. Please try again.' },
              { status: 500 }
            );
          }

          return NextResponse.json({
            success: true,
            message: 'Confirmation email sent',
            userExists: true,
          });
        }

        console.error('Error registering user:', registerData);
        return NextResponse.json(
          { error: registerData.error?.message || 'Failed to create account' },
          { status: registerResponse.status }
        );
      }

      // Strapi automatically sends confirmation email on registration
      // Return the temp password so frontend can use it for auto-login after confirmation
      return NextResponse.json({
        success: true,
        message: 'Account created successfully. Please check your email for confirmation.',
        tempKey: randomPassword, // Used for auto-login after email confirmation
        user: {
          id: registerData.user?.id,
          email: registerData.user?.email,
        },
      });

    } else if (action === 'resend') {
      // Resend confirmation email
      if (!email) {
        return NextResponse.json(
          { error: 'Email is required' },
          { status: 400 }
        );
      }

      const sendEmailResponse = await fetch(`${STRAPI_URL}/api/auth/send-email-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (!sendEmailResponse.ok) {
        const emailError = await sendEmailResponse.json();
        console.error('Error sending confirmation email:', emailError);
        return NextResponse.json(
          { error: emailError.error?.message || 'Failed to send confirmation email' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Confirmation email sent',
      });

    } else if (action === 'confirm') {
      // Confirm email with the confirmation code
      if (!body.code) {
        return NextResponse.json(
          { error: 'Confirmation code is required' },
          { status: 400 }
        );
      }

      // Strapi's email-confirmation endpoint returns HTML on success (redirects to a page)
      // We need to check if it was successful by the response status
      const confirmResponse = await fetch(
        `${STRAPI_URL}/api/auth/email-confirmation?confirmation=${body.code}`,
        {
          method: 'GET',
          redirect: 'manual', // Don't follow redirects automatically
        }
      );

      // Success is indicated by a redirect (302) or OK (200)
      // Error would be 400 with JSON error message
      if (confirmResponse.status === 400) {
        const confirmError = await confirmResponse.json().catch(() => ({}));
        console.error('Error confirming email:', confirmError);
        return NextResponse.json(
          { error: confirmError.error?.message || 'Invalid or expired confirmation code' },
          { status: 400 }
        );
      }

      // If we get here, confirmation was successful
      return NextResponse.json({
        success: true,
        message: 'Email confirmed successfully!',
      });

    } else if (action === 'login') {
      // Login with email and password to get JWT
      if (!email || !body.password) {
        return NextResponse.json(
          { error: 'Email and password are required' },
          { status: 400 }
        );
      }

      const loginResponse = await fetch(`${STRAPI_URL}/api/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: email,
          password: body.password,
        }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        console.error('Error logging in:', loginData);
        return NextResponse.json(
          { error: loginData.error?.message || 'Failed to login' },
          { status: loginResponse.status }
        );
      }

      return NextResponse.json({
        success: true,
        jwt: loginData.jwt,
        user: loginData.user,
      });

    } else {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Error in auth route:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
