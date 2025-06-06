import React from "react";

interface Span {
  _type: "span";
  marks: string[];
  text: string;
  _key: string;
}

interface Block {
  _type: "block";
  style: string;
  _key: string;
  /** Marcadores de definições de marcação não utilizados aqui */
  markDefs: unknown[];
  children: Span[];
}

interface SimplePortableTextProps {
  value: Block[];
  className?: string;
}

const SimplePortableText: React.FC<SimplePortableTextProps> = ({ value, className }) => {
  if (!value || !Array.isArray(value)) return null;

  // Função para estilizar spans com base nas marcações e preservar quebras de linha
  const renderSpan = (span: Span) => {
    // Preserva quebras de linha no texto
    const processText = (text: string) => {
      return text.split('\n').map((line, i, array) => 
        i === array.length - 1 ? line : (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        )
      );
    };
    
    const content = processText(span.text);
    
    // Aplica marcações em ordem
    if (span.marks && span.marks.length > 0) {
      return (
        <React.Fragment key={span._key}>
          {span.marks.includes('strong') && <strong>{content}</strong>}
          {span.marks.includes('em') && <em>{content}</em>}
          {!span.marks.includes('strong') && !span.marks.includes('em') && content}
        </React.Fragment>
      );
    }
    
    return content;
  };

  // Renderiza um bloco com estilo apropriado
  const renderBlock = (block: Block) => {
    const blockStyle = block.style || "normal";
    const content = block.children.map(renderSpan);
    
    switch (blockStyle) {
      case "h1":
        return <h1 className="text-4xl font-bold mb-4">{content}</h1>;
      case "h2":
        return <h2 className="text-3xl font-bold mb-4">{content}</h2>;
      case "h3":
        return <h3 className="text-2xl font-bold mb-3">{content}</h3>;
      case "h4":
        return <h4 className="text-xl font-bold mb-2">{content}</h4>;
      case "blockquote":
        return <blockquote className="pl-4 border-l-4 border-gray-300 italic">{content}</blockquote>;
      default:
        return <p className="mb-4">{content}</p>;
    }
  };

  // Verifica se é um separador
  const isSeparator = (block: Block) => {
    if (block.children.length !== 1) return false;
    return block.children[0].text.trim() === '---';
  };

  // Agrupa blocos por separadores
  const groups: Block[][] = [];
  let current: Block[] = [];
  
  value.forEach(block => {
    if (isSeparator(block)) {
      if (current.length > 0) groups.push(current);
      current = [];
    } else {
      current.push(block);
    }
  });
  
  if (current.length > 0) groups.push(current);

  // Se houver múltiplos grupos, renderiza em seções
  if (groups.length > 1) {
    return (
      <>
        {groups.map((group, idx) => (
          <div key={idx} className="flex flex-col gap-6 text-justify">
            {group.map((block) => (
              <React.Fragment key={block._key}>
                {renderBlock(block)}
              </React.Fragment>
            ))}
          </div>
        ))}
      </>
    );
  }

  // Render normal se só um grupo
  return (
    <div className={className}>
      {value.map((block) => (
        !isSeparator(block) && (
          <React.Fragment key={block._key}>
            {renderBlock(block)}
          </React.Fragment>
        )
      ))}
    </div>
  );
};

export default SimplePortableText;