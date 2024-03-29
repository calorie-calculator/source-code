import React, { useEffect, useState } from 'react';
import marked from 'marked';
import dompurify from 'dompurify';
import axios from 'axios';
import { Skeleton } from 'antd';

interface BaseMarkdownConverterProps {
  url: string;
}

export default function BaseMarkdownConverter({ url }: BaseMarkdownConverterProps) {
  const [markdown, setMarkdown] = useState('');

  const init = async () => {
    const markdown = await axios.get<string>(url).then(({ data }) => data);
    setMarkdown(markdown);
  };

  useEffect(() => {
    init();
  }, [url]);

  if (!markdown) {
    return <Skeleton active paragraph={{ rows: 8 }} />;
  }

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: marked(markdown, { sanitizer: (dirty) => dompurify.sanitize(dirty) }),
      }}
      className="markdown-content"
    ></div>
  );
}
