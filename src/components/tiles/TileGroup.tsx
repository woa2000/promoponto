// components/tiles/TileGroup.tsx
"use client";
import React from "react";
import {
  SquareLarge,
  SquareSmall,
  RectHorizontal,
  RectVertical,
} from "./Atomic";
import type { TileData } from "@/types/TileData";

export type TileVariant =
  | "single-large"
  | "two-smalls"
  | "four-smalls"  
  | "vertical-combo"
  | "single-horizontal"
  | "horizontal-combo";

interface TileGroupProps {
  variant: TileVariant;
  tiles: TileData[];
  /**
   *  Espaço interno opcional; default 0 px
   */
  padding?: string;
  /**
   *  Gap interno opcional; default 4 px
   */
  gap?: string;
}

const TileGroup: React.FC<TileGroupProps> = ({
  variant,
  tiles,
  padding = "p-0",
  gap = "gap-4",
}) => {
  /** Container é sempre quadrado (aspect-square) e se ajusta ao pai */
  const base = `aspect-square w-full grid ${padding} ${gap}`;  

  switch (variant) {
    case "single-large":
      return (
        <div className={`${base} place-items-stretch`}>
          {tiles[0] && <SquareLarge tile={tiles[0]} />}
        </div>
      );

    case "two-smalls":
      return (
        <div className={`${base} grid-cols-2 grid-rows-2`}>
          {[0, 1].map((i) => {
            return tiles[i] ? (
              <SquareSmall key={i} tile={tiles[i]} />
            ) : (
              <SquareSmall key={i} tile={undefined} />
            )}
          )}
        </div>
      );

    case "four-smalls":
      return (
        <div className={`${base} grid-cols-2 grid-rows-2`}>
          {[0, 1, 2, 3].map((i) => {
            return tiles[i] ? (
              <SquareSmall key={i} tile={tiles[i]} />
            ) : (
              <SquareSmall key={i} tile={undefined} />
            )}
          )}
        </div>
      );

    case "vertical-combo":
      return (
        <div className={`${base} grid-cols-2 grid-rows-2`}>
          {/* Retângulo vertical ocupa 2 linhas da col‑0 */}
          {tiles[0] && <RectVertical className="row-span-2" tile={tiles[0]} />}
          {tiles[1] && <SquareSmall tile={tiles[1]} />}
          {tiles[2] && <SquareSmall tile={tiles[2]} />}
        </div>
      );

    case "single-horizontal":
      return (
        <div className={`${base} grid-cols-2 grid-rows-2`}>
          {/* Retângulo horizontal ocupa 2 colunas da row‑0 */}
          {tiles[0] && <RectHorizontal className="col-span-2" tile={tiles[0]} />}
        </div>
      );  
    case "horizontal-combo":
      return (
        <div className={`${base} grid-cols-2 grid-rows-2`}>
          {/* Retângulo horizontal ocupa 2 colunas da row‑0 */}
          {tiles[0] && <RectHorizontal className="col-span-2" tile={tiles[0]} />}
          {tiles[1] && <SquareSmall tile={tiles[1]} />}
          {tiles[2] && <SquareSmall tile={tiles[2]} />}
        </div>
      );

    default:
      return null;
  }
};

export default TileGroup;

