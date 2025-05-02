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

  // Converte cada bloco em string de parágrafo
  const paragraphs = value.map((block) =>
    block.children.map((span) => span.text).join("")
  );

  // Agrupa por separador '---'
  const groups: string[][] = [];
  let current: string[] = [];
  paragraphs.forEach((text) => {
    if (text.trim() === '---') {
      if (current.length > 0) groups.push(current);
      current = [];
    } else {
      current.push(text);
    }
  });
  if (current.length > 0) groups.push(current);

  // Se houver múltiplos grupos, renderiza em seções
  if (groups.length > 1) {
    return (
      <>
        {groups.map((group, idx) => (
          <div key={idx} className="flex flex-col gap-6 text-justify">
            {group.map((text, i) => (
              <p key={i} className="mb-4">{text}</p>
            ))}
          </div>
        ))}
      </>
    );
  }

  // Render normal se só um grupo
  return (
    <div className={className}>
      {paragraphs.map((text, i) => (
        <p key={i} className="mb-4">{text}</p>
      ))}
    </div>
  );
};

export default SimplePortableText;


// import React from "react";

// interface Span {
//   _type: "span";
//   marks: string[];
//   text: string;
//   _key: string;
// }

// interface Block {
//   _type: "block";
//   style: string;
//   _key: string;
//   markDefs: any[];
//   children: Span[];
// }

// interface SimplePortableTextProps {
//   value: Block[];
//   className?: string;
// }
// const SimplePortableText: React.FC<SimplePortableTextProps> = ({ value, className }) => {
//   if (!value || !Array.isArray(value)) return null;

//   // Monta os parágrafos como strings
//   const paragraphs = value.map((block) =>
//     block.children.map((span) => span.text).join("")
//   );

//   // Separa em grupos caso encontre '---' em algum parágrafo
//   const groups: string[][] = [];
//   let current: string[] = [];
//   paragraphs.forEach((text) => {
//     if (text.trim() === '---') {
//       if (current.length > 0) groups.push(current);
//       current = [];
//     } else {
//       current.push(text);
//     }
//   });
//   if (current.length > 0) groups.push(current);

//   // Se houver separação, renderiza grupos com a div especial
//   if (groups.length > 1) {
//     return (
//       <>
//         {groups.map((group, idx) => (
//           <div key={idx} className="flex flex-col gap-6 text-justify">
//             {group.map((text, i) => (
//               <p key={i} className="mb-4">{text}</p>
//             ))}
//           </div>
//         ))}
//       </>
//     );
//   }

//   // Caso não haja separação, renderiza normalmente
//   return (
//     <div className={className}>
//       {paragraphs.map((text, i) => (
//         <p key={i} className="mb-4">{text}</p>
//       ))}
//     </div>
//   );
// };


// export default SimplePortableText;
