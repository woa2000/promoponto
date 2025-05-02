'use client'
// src/components/HomeGrid.tsx
import React, { useMemo, useEffect, useState } from 'react'
import TileGroup from '../tiles/TileGroup'
import type { TileData } from '@/types/TileData'

const VARIANTS = [
  'four-smalls',
  'single-large',
  'vertical-combo',
  'horizontal-combo',
] as const;

type Variant = typeof VARIANTS[number];

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function HomeGrid(props: { tiles?: TileData[] }) {
  const tiles = useMemo(() => props.tiles ?? [], [props.tiles]);
  const [renderedVariants, setRenderedVariants] = useState<{
    variant: Variant;
    tiles: TileData[];
  }[]>([]);

  useEffect(() => {
    let tilesRestantes = [...tiles];
    const variantsRestantes = shuffle([...VARIANTS]) as Variant[];
    const resultado: { variant: Variant; tiles: TileData[] }[] = [];

    const variantTypeMap: Record<Variant, Variant[]> = {
      'single-large': ['single-large'],
      'four-smalls': ['four-smalls', 'four-smalls', 'four-smalls', 'four-smalls'],
      'vertical-combo': ['vertical-combo', 'four-smalls', 'four-smalls'],
      'horizontal-combo': ['horizontal-combo', 'four-smalls', 'four-smalls'],
    };

    while (tilesRestantes.length > 0 && variantsRestantes.length > 0) {
      const variant = variantsRestantes.shift()!;
      const tiposAceitos = variantTypeMap[variant];
      const usados: TileData[] = [];
      const tempTiles = [...tilesRestantes];
      let ok = true;

      for (const tipo of tiposAceitos) {
        const idx = tempTiles.findIndex(t => t.type === tipo);
        if (idx === -1) {
          ok = false;
          break;
        }
        usados.push(tempTiles[idx]);
        tempTiles.splice(idx, 1);
      }

      if (ok) {
        const tilesUsados = variant === 'vertical-combo'
          ? usados.map((tile, idx) => (idx === 0 ? { ...tile, addGap: true } : tile))
          : usados;

        resultado.push({ variant, tiles: tilesUsados });
        tilesRestantes = tempTiles;
      }
    }

    setRenderedVariants(resultado);
  }, [tiles]);

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
