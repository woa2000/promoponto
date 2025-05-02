'use client';

// src/components/grid/CasesGrid.tsx
import React, { useEffect, useState, useMemo } from 'react';
import TileGroup from '../tiles/TileGroup';
import type { TileData } from '@/types/TileData';

const VARIANTS = [
  'four-smalls',
  'single-large',
  'vertical-combo',
  'horizontal-combo',
] as const;

type Variant = typeof VARIANTS[number];

function shuffle<T>(array: readonly T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function CasesGrid({ tiles = [] }: { tiles?: TileData[] }) {
  // Memoriza o array de tiles para evitar recriações
  const memoTiles = useMemo(() => tiles, [tiles]);

  const [renderedVariants, setRenderedVariants] = useState<{
    variant: Variant;
    tiles: TileData[];
  }[]>([]);

  useEffect(() => {
    let tilesRestantes = [...memoTiles];
    const resultado: { variant: Variant; tiles: TileData[] }[] = [];

    // Quantidade necessária de tiles para cada variante
    const variantCountMap: Record<Variant, number> = {
      'single-large': 1,
      'four-smalls': 4,
      'vertical-combo': 3,
      'horizontal-combo': 3,
    };

    // Construção iterativa das seções
    while (tilesRestantes.length > 0) {
      let foundVariant = false;
      const variantsAleatorias = shuffle(VARIANTS);

      for (const variant of variantsAleatorias) {
        const needCount = variantCountMap[variant as Variant];
        if (tilesRestantes.length < needCount) continue;

        const usados: TileData[] = [];
        const tempTiles = [...tilesRestantes];

        // Seleciona tiles aleatórios
        for (let i = 0; i < needCount; i++) {
          const randomIndex = Math.floor(Math.random() * tempTiles.length);
          usados.push(tempTiles[randomIndex]);
          tempTiles.splice(randomIndex, 1);
        }

        // Aplica gap extra no primeiro tile se for vertical-combo
        const tilesUsados =
          variant === 'vertical-combo'
              ? usados.map((tile, idx) => (idx === 0 ? { ...tile, addGap: true } : tile))
              : usados;

        resultado.push({ variant: variant as Variant, tiles: tilesUsados });
        tilesRestantes = tempTiles;
        foundVariant = true;
        break;
      }

      if (!foundVariant) break;
    }

    setRenderedVariants(resultado);
  }, [memoTiles]);

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {renderedVariants.map(({ variant, tiles }, index) => (
        <section key={`${variant}-${index}`}>          
          <TileGroup variant={variant} tiles={tiles} />
        </section>
      ))}
    </main>
  );
}


// 'use client';

// import React, { useEffect, useState } from 'react';
// import TileGroup from '../tiles/TileGroup';
// import type { TileData } from '@/types/TileData';

// const VARIANTS = [
//   'four-smalls',
//   'single-large',
//   'vertical-combo',
//   'horizontal-combo',  
// ] as const;

// function shuffle<T>(array: T[]): T[] {
//   const arr = [...array];
//   for (let i = arr.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [arr[i], arr[j]] = [arr[j], arr[i]];
//   }
//   return arr;
// }

// export default function CasesGrid({ tiles = [] }: { tiles?: TileData[] }) {
//   const [renderedVariants, setRenderedVariants] = useState<
//     { variant: string; tiles: TileData[] }[]
//   >([]);

//   useEffect(() => {
//     let tilesRestantes = [...tiles];
//     const resultado: { variant: string; tiles: TileData[] }[] = [];

//     const variantTypeMap: Record<string, string[]> = {
//       'single-large': ['single-large'],
//       'four-smalls': ['four-smalls', 'four-smalls', 'four-smalls', 'four-smalls'],
//       'vertical-combo': ['vertical-combo', 'four-smalls', 'four-smalls'],
//       'horizontal-combo': ['horizontal-combo', 'four-smalls', 'four-smalls'],
//     };

//     while (tilesRestantes.length > 0) {
//       let foundVariant = false;
//       const variantsAleatorias = shuffle([...VARIANTS]);

//       for (const variant of variantsAleatorias) {
//         const tiposNecessarios = variantTypeMap[variant];

//         // ✅ Validação da quantidade mínima de tiles
//         if (tilesRestantes.length < tiposNecessarios.length) continue;

//         const usados: TileData[] = [];
//         const tempTiles = [...tilesRestantes];
//         let ok = true;

//         // Escolhe tiles aleatórios suficientes para a variante, independentemente do tipo
//         for (let i = 0; i < tiposNecessarios.length; i++) {
//           if (tempTiles.length === 0) { // Segurança extra, embora a validação inicial deva cobrir
//             ok = false;
//             break;
//           }
//           const randomIndex = Math.floor(Math.random() * tempTiles.length);
//           usados.push(tempTiles[randomIndex]);
//           tempTiles.splice(randomIndex, 1); // Remove o tile escolhido
//         }

//         if (ok) {
//           const tilesUsados =
//             variant === 'vertical-combo'
//               ? usados.map((tile, idx) => (idx === 0 ? { ...tile, addGap: true } : tile))
//               : usados;

//           resultado.push({ variant, tiles: tilesUsados });
//           tilesRestantes = tempTiles;
//           foundVariant = true;
//           break; // começa nova iteração com tiles atualizados
//         }
//       }

//       if (!foundVariant) break; // nenhuma variante pôde ser preenchida com os tiles restantes
//     }

//     setRenderedVariants(resultado);
//   }, [tiles]);

//   return (
//     <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       {renderedVariants.map(({ variant, tiles }, index) => (
//         <section key={`${variant}-${index}`}>
//           <TileGroup variant={variant as any} tiles={tiles} />
//         </section>
//       ))}
//     </main>
//   );
// }
