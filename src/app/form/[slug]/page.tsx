'use client';

import { Box, Container, Heading, Text, VStack, HStack, Spinner, Button, Input, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface QuestionBoolean {
  id: number;
  documentId: string;
  Question: string;
  Order: number;
}

interface QuestionMcq {
  id: number;
  documentId: string;
  Question: string;
  Order: number;
  a?: string;
  b?: string;
  c?: string;
  d?: string;
  e?: string;
  f?: string;
  g?: string;
}

interface QuestionSubjective {
  id: number;
  documentId: string;
  Question: string;
  Order: number;
}

interface Form {
  id: number;
  documentId: string;
  Name: string;
  Slug: string;
  question_booleans?: QuestionBoolean[];
  question_mcqs?: QuestionMcq[];
  question_subjectives?: QuestionSubjective[];
}

interface FormResponse {
  data: Form;
}

type QuestionType = 'boolean' | 'mcq' | 'subjective';

interface CombinedQuestion {
  id: number;
  documentId: string;
  Question: string;
  Order: number;
  type: QuestionType;
  options?: string[];
}

export default function FormPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchForm() {
      try {
        setLoading(true);
        const response = await fetch(`/api/forms/${slug}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('API Error:', errorData);
          throw new Error(errorData.error || 'Failed to fetch form');
        }
        
        const data: FormResponse = await response.json();
        console.log('Fetched form:', data);
        setForm(data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching form:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load form. Please try again later.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchForm();
    }
  }, [slug]);

  // Combine and sort all questions by Order
  const getAllQuestions = (): CombinedQuestion[] => {
    if (!form) return [];

    const questions: CombinedQuestion[] = [];

    // Add boolean questions
    form.question_booleans?.forEach(q => {
      questions.push({
        id: q.id,
        documentId: q.documentId,
        Question: q.Question,
        Order: q.Order,
        type: 'boolean',
      });
    });

    // Add MCQ questions with options
    form.question_mcqs?.forEach(q => {
      const options: string[] = [];
      if (q.a) options.push(q.a);
      if (q.b) options.push(q.b);
      if (q.c) options.push(q.c);
      if (q.d) options.push(q.d);
      if (q.e) options.push(q.e);
      if (q.f) options.push(q.f);
      if (q.g) options.push(q.g);

      questions.push({
        id: q.id,
        documentId: q.documentId,
        Question: q.Question,
        Order: q.Order,
        type: 'mcq',
        options,
      });
    });

    // Add subjective questions
    form.question_subjectives?.forEach(q => {
      questions.push({
        id: q.id,
        documentId: q.documentId,
        Question: q.Question,
        Order: q.Order,
        type: 'subjective',
      });
    });

    // Sort by Order
    return questions.sort((a, b) => a.Order - b.Order);
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Format answers as markdown
  const formatAnswersAsMarkdown = (questions: CombinedQuestion[]): string => {
    let markdown = `# ${form?.Name} - Submission\n\n`;
    markdown += `**Submitted at:** ${new Date().toLocaleString()}\n\n`;
    markdown += `---\n\n`;

    questions.forEach((question, index) => {
      const answerKey = `${question.type}-${question.id}`;
      const answer = answers[answerKey] || '*No answer provided*';
      
      markdown += `### ${index + 1}. ${question.Question}\n\n`;
      
      if (question.type === 'boolean') {
        markdown += `**Answer:** ${answer === 'yes' ? 'Yes' : answer === 'no' ? 'No' : '*No answer provided*'}\n\n`;
      } else if (question.type === 'mcq') {
        markdown += `**Selected:** ${answer}\n\n`;
      } else {
        markdown += `**Response:**\n\n${answer}\n\n`;
      }
      
      markdown += `---\n\n`;
    });

    return markdown;
  };

  const handleSubmit = async () => {
    if (!form) return;
    
    const allQuestions = getAllQuestions();
    const content = formatAnswersAsMarkdown(allQuestions);
    
    setSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formDocumentId: form.documentId,
          content,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to submit form');
      }
      
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit form. Please try again.';
      setSubmitError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const questions = getAllQuestions();

  if (loading) {
    return (
      <Box as="main" position="relative" minH="100vh" pt={{ base: "2rem", md: "3rem" }} pb="4rem">
        <Container maxW="800px" px={{ base: "1rem", md: "2rem" }}>
          <Box textAlign="center" py="4rem">
            <Spinner size="xl" color="#1fdc8f" />
            <Text mt="1rem" fontSize={{ base: "1rem", md: "1.25rem" }} color="rgba(255, 255, 255, 0.7)">
              Loading form...
            </Text>
          </Box>
        </Container>
      </Box>
    );
  }

  if (error || !form) {
    return (
      <Box as="main" position="relative" minH="100vh" pt={{ base: "2rem", md: "3rem" }} pb="4rem">
        <Container maxW="800px" px={{ base: "1rem", md: "2rem" }}>
          <VStack gap="2rem" align="center" py="4rem">
            <Box
              textAlign="center"
              bg="rgba(255, 0, 0, 0.1)"
              border="1px solid rgba(255, 0, 0, 0.3)"
              borderRadius="8px"
              p={{ base: "1.5rem", md: "2rem" }}
            >
              <Heading as="h2" fontSize={{ base: "1.5rem", md: "2rem" }} mb="1rem" color="white">
                {error || 'Form not found'}
              </Heading>
              <Text fontSize={{ base: "1rem", md: "1.125rem" }} color="rgba(255, 255, 255, 0.8)" mb="2rem">
                The form you&apos;re looking for doesn&apos;t exist or has been removed.
              </Text>
              <Link href="/forms">
                <Box
                  as="button"
                  bg="#1fdc8f"
                  color="black"
                  fontSize={{ base: "0.875rem", md: "1rem" }}
                  fontWeight="bold"
                  fontFamily="MOS"
                  px={{ base: "1.5rem", md: "2rem" }}
                  py={{ base: "0.875rem", md: "1rem" }}
                  borderRadius="0"
                  textTransform="uppercase"
                  transition="all 0.2s"
                  _hover={{ bg: "#18c57d" }}
                >
                  Back to Forms
                </Box>
              </Link>
            </Box>
          </VStack>
        </Container>
      </Box>
    );
  }

  if (submitted) {
    return (
      <Box as="main" position="relative" minH="100vh" pt={{ base: "2rem", md: "3rem" }} pb="4rem">
        <Container maxW="800px" px={{ base: "1rem", md: "2rem" }}>
          <VStack gap="2rem" align="center" py="4rem">
            <Box
              textAlign="center"
              bg="rgba(31, 220, 143, 0.1)"
              border="1px solid rgba(31, 220, 143, 0.3)"
              borderRadius="8px"
              p={{ base: "2rem", md: "3rem" }}
            >
              <Box
                fontSize="4rem"
                mb="1rem"
              >
                ✓
              </Box>
              <Heading as="h2" fontSize={{ base: "1.5rem", md: "2rem" }} mb="1rem" color="white">
                Form Submitted!
              </Heading>
              <Text fontSize={{ base: "1rem", md: "1.125rem" }} color="rgba(255, 255, 255, 0.8)" mb="2rem">
                Thank you for filling out {form.Name}. We&apos;ll be in touch soon.
              </Text>
              <Link href="/forms">
                <Box
                  as="button"
                  bg="#1fdc8f"
                  color="black"
                  fontSize={{ base: "0.875rem", md: "1rem" }}
                  fontWeight="bold"
                  fontFamily="MOS"
                  px={{ base: "1.5rem", md: "2rem" }}
                  py={{ base: "0.875rem", md: "1rem" }}
                  borderRadius="0"
                  textTransform="uppercase"
                  transition="all 0.2s"
                  _hover={{ bg: "#18c57d" }}
                >
                  Back to Forms
                </Box>
              </Link>
            </Box>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box as="main" position="relative" minH="100vh" pt={{ base: "2rem", md: "3rem" }} pb="4rem">
      <Container maxW="800px" px={{ base: "1rem", md: "2rem" }}>
        <VStack gap={{ base: "2rem", md: "3rem" }} align="stretch">
          {/* Back Button */}
          <Link href="/forms">
            <Text
              color="#1fdc8f"
              fontSize={{ base: "0.875rem", md: "1rem" }}
              fontWeight="bold"
              _hover={{ textDecoration: 'underline' }}
              cursor="pointer"
            >
              ← Back to Forms
            </Text>
          </Link>

          {/* Form Header */}
          <Box>
            <HStack gap="1rem" mb="1.5rem" flexWrap="wrap">
              <Box
                bg="rgba(31, 220, 143, 0.2)"
                px="1rem"
                py="0.5rem"
                fontSize="0.875rem"
                fontWeight="bold"
                textTransform="uppercase"
                color="#1fdc8f"
              >
                Form
              </Box>
            </HStack>

            <Heading
              as="h1"
              fontSize={{ base: "2rem", sm: "2.5rem", md: "3rem" }}
              fontWeight="bold"
              mb="1rem"
              lineHeight="1.2"
              color="white"
            >
              {form.Name}
            </Heading>

            <Text
              fontSize={{ base: "1rem", md: "1.125rem" }}
              color="rgba(255, 255, 255, 0.7)"
            >
              Please fill out all the questions below
            </Text>
          </Box>

          {/* Questions */}
          <VStack gap="2rem" align="stretch">
            {questions.map((question, index) => (
              <Box
                key={`${question.type}-${question.id}`}
                bg="rgba(255, 255, 255, 0.03)"
                border="1px solid rgba(255, 255, 255, 0.1)"
                p={{ base: "1.5rem", md: "2rem" }}
              >
                <VStack align="stretch" gap="1rem">
                  <HStack justify="space-between" align="flex-start">
                    <Text
                      fontSize={{ base: "1rem", md: "1.125rem" }}
                      fontWeight="bold"
                      color="white"
                      flex="1"
                    >
                      {index + 1}. {question.Question}
                    </Text>
                    <Box
                      bg={
                        question.type === 'boolean' 
                          ? 'rgba(59, 130, 246, 0.2)' 
                          : question.type === 'mcq' 
                          ? 'rgba(168, 85, 247, 0.2)' 
                          : 'rgba(249, 115, 22, 0.2)'
                      }
                      px="0.5rem"
                      py="0.25rem"
                      fontSize="0.7rem"
                      fontWeight="bold"
                      textTransform="uppercase"
                      color={
                        question.type === 'boolean' 
                          ? '#3b82f6' 
                          : question.type === 'mcq' 
                          ? '#a855f7' 
                          : '#f97316'
                      }
                      flexShrink={0}
                    >
                      {question.type === 'boolean' ? 'Yes/No' : question.type === 'mcq' ? 'Multiple Choice' : 'Text'}
                    </Box>
                  </HStack>

                  {/* Boolean Question */}
                  {question.type === 'boolean' && (
                    <HStack gap="1rem">
                      <Box
                        as="button"
                        px="2rem"
                        py="0.75rem"
                        bg={answers[`${question.type}-${question.id}`] === 'yes' ? '#1fdc8f' : 'transparent'}
                        color={answers[`${question.type}-${question.id}`] === 'yes' ? 'black' : 'white'}
                        border="1px solid"
                        borderColor={answers[`${question.type}-${question.id}`] === 'yes' ? '#1fdc8f' : 'rgba(255, 255, 255, 0.3)'}
                        fontWeight="bold"
                        transition="all 0.2s"
                        onClick={() => handleAnswerChange(`${question.type}-${question.id}`, 'yes')}
                        _hover={{
                          borderColor: '#1fdc8f',
                          bg: answers[`${question.type}-${question.id}`] === 'yes' ? '#18c57d' : 'rgba(31, 220, 143, 0.1)',
                        }}
                      >
                        Yes
                      </Box>
                      <Box
                        as="button"
                        px="2rem"
                        py="0.75rem"
                        bg={answers[`${question.type}-${question.id}`] === 'no' ? '#1fdc8f' : 'transparent'}
                        color={answers[`${question.type}-${question.id}`] === 'no' ? 'black' : 'white'}
                        border="1px solid"
                        borderColor={answers[`${question.type}-${question.id}`] === 'no' ? '#1fdc8f' : 'rgba(255, 255, 255, 0.3)'}
                        fontWeight="bold"
                        transition="all 0.2s"
                        onClick={() => handleAnswerChange(`${question.type}-${question.id}`, 'no')}
                        _hover={{
                          borderColor: '#1fdc8f',
                          bg: answers[`${question.type}-${question.id}`] === 'no' ? '#18c57d' : 'rgba(31, 220, 143, 0.1)',
                        }}
                      >
                        No
                      </Box>
                    </HStack>
                  )}

                  {/* MCQ Question */}
                  {question.type === 'mcq' && question.options && (
                    <VStack align="stretch" gap="0.5rem">
                      {question.options.map((option, optionIndex) => (
                        <Box
                          key={optionIndex}
                          as="button"
                          p="1rem"
                          bg={answers[`${question.type}-${question.id}`] === option ? 'rgba(31, 220, 143, 0.15)' : 'transparent'}
                          border="1px solid"
                          borderColor={answers[`${question.type}-${question.id}`] === option ? '#1fdc8f' : 'rgba(255, 255, 255, 0.2)'}
                          textAlign="left"
                          color="white"
                          transition="all 0.2s"
                          onClick={() => handleAnswerChange(`${question.type}-${question.id}`, option)}
                          _hover={{
                            borderColor: '#1fdc8f',
                            bg: 'rgba(31, 220, 143, 0.1)',
                          }}
                        >
                          <HStack>
                            <Box
                              w="24px"
                              h="24px"
                              borderRadius="50%"
                              border="2px solid"
                              borderColor={answers[`${question.type}-${question.id}`] === option ? '#1fdc8f' : 'rgba(255, 255, 255, 0.3)'}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              flexShrink={0}
                            >
                              {answers[`${question.type}-${question.id}`] === option && (
                                <Box
                                  w="12px"
                                  h="12px"
                                  borderRadius="50%"
                                  bg="#1fdc8f"
                                />
                              )}
                            </Box>
                            <Text fontSize="1rem">{option}</Text>
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  )}

                  {/* Subjective Question */}
                  {question.type === 'subjective' && (
                    <Textarea
                      placeholder="Type your answer here..."
                      value={answers[`${question.type}-${question.id}`] || ''}
                      onChange={(e) => handleAnswerChange(`${question.type}-${question.id}`, e.target.value)}
                      bg="rgba(255, 255, 255, 0.05)"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      color="white"
                      _placeholder={{ color: 'rgba(255, 255, 255, 0.4)' }}
                      _hover={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
                      _focus={{ 
                        borderColor: '#1fdc8f', 
                        boxShadow: '0 0 0 1px #1fdc8f',
                      }}
                      minH="120px"
                      resize="vertical"
                    />
                  )}
                </VStack>
              </Box>
            ))}
          </VStack>

          {/* Submit Error */}
          {submitError && (
            <Box
              bg="rgba(255, 0, 0, 0.1)"
              border="1px solid rgba(255, 0, 0, 0.3)"
              borderRadius="8px"
              p="1rem"
            >
              <Text color="rgba(255, 255, 255, 0.9)">
                {submitError}
              </Text>
            </Box>
          )}

          {/* Submit Button */}
          {questions.length > 0 && (
            <Box pt="1rem">
              <Button
                onClick={handleSubmit}
                bg="#1fdc8f"
                color="black"
                fontSize={{ base: "1rem", md: "1.125rem" }}
                fontWeight="bold"
                fontFamily="MOS"
                px={{ base: "2rem", md: "3rem" }}
                py={{ base: "1.25rem", md: "1.5rem" }}
                borderRadius="0"
                textTransform="uppercase"
                transition="all 0.2s"
                _hover={{ bg: "#18c57d" }}
                size="lg"
                w={{ base: "100%", md: "auto" }}
                disabled={submitting}
                opacity={submitting ? 0.7 : 1}
              >
                {submitting ? 'Submitting...' : 'Submit Form'}
              </Button>
            </Box>
          )}

          {/* No Questions State */}
          {questions.length === 0 && (
            <Box textAlign="center" py="4rem">
              <Text fontSize="1.25rem" color="rgba(255, 255, 255, 0.7)">
                This form has no questions yet.
              </Text>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
