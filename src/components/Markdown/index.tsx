import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import { Props } from "./props";
import remarkBreaks from "remark-breaks";

export const MarkdownRender: React.FC<Props> = ({
  className,
  text,
  components,
}) => {
  // ================= VIEWS
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      rehypePlugins={[rehypeRaw]}
      components={components}
      // transformImageUri={(uri) => getStrapiMedia(uri)}
      // components={{
      //   a: (props) => (
      //     <CustomLink
      //       className="no-underline"
      //       href={props.href!}
      //       type="body"
      //       label={props.children.toString()}
      //     />
      //   ),
      //   ...components,
      // }}
      // // https://github.com/remarkjs/react-markdown/issues/505#issuecomment-724911501
      // //https://tailwindcss.com/docs/typography-plugin
      // // can pass down the prose-[your element]:{utility} to adjust the spacing you want
      // className={classNames("prose leading-6", className)}
      className={className}
    >
      {text}
    </ReactMarkdown>
  );
};
export default MarkdownRender;
