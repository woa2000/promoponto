import React from "react";
import Image from "next/image";
import type { TileData } from "@/types/TileData";
import Link from 'next/link';

export type LabelPosition = "bottom-left" | "right-vertical";

interface TileProps {
  className?: string;
  label?: string;
  labelPos?: LabelPosition;
  /** addGap indica se deve aplicar gap extra em vertical */
  tile?: TileData & { addGap?: boolean };
}

export const SquareSmall: React.FC<TileProps> = (p) => (
  <TileBase size="square-small" {...p} />
);

export const SquareLarge: React.FC<TileProps> = (p) => {
  const { className, ...rest } = p;
  return (
    <TileBase
      size="square-large"
      className={`w-full ${className ?? ""}`}
      {...rest}
    />
  );
};

export const RectHorizontal: React.FC<TileProps> = (p) => (
  <TileBase size="h-rect" {...p} style={{ maxHeight: "calc(100% - 2px)" }} />
);

export const RectVertical: React.FC<TileProps> = (p) => {
  // Usa o campo addGap sem cast any
  const style = p.tile?.addGap ? { minHeight: "100%" } : undefined;
  return <TileBase size="v-rect" {...p} style={style} />;
};

type InternalProps = TileProps & {
  size: "square-small" | "square-large" | "h-rect" | "v-rect";
};

const TileBase: React.FC<InternalProps & { style?: React.CSSProperties }> = ({
  className = "",
  label,
  labelPos = "bottom-left",
  size,
  tile,
  style,
}) => {
  const tileLabel = tile?.titulo ?? label;

  const shape =
    size === "square-small" || size === "square-large"
      ? "aspect-square"
      : size === "h-rect"
      ? "aspect-[2/1]"
      : "aspect-[1/2]";

  let labelClasses = "absolute text-white font-extrabold leading-none";
  let labelSpecificPosClass = "";
  let labelSizeClass = "";

  if (size === "square-small") {
    labelSizeClass = "text-2xl";
    labelSpecificPosClass =
      labelPos === "bottom-left"
        ? "left-3 bottom-3"
        : "right-3 bottom-3";
  } else {
    labelSizeClass = "text-5xl";
    labelSpecificPosClass =
      labelPos === "bottom-left"
        ? "left-5 bottom-5"
        : "right-3 top-1/2 -translate-y-1/2";
  }

  labelClasses = `${labelClasses} ${labelSizeClass} ${labelSpecificPosClass}`;

  return (
    <div
      className={`relative w-full rounded-xl overflow-hidden ${shape} ${className}`}
      style={style}
    >
      <Link href={`${tile?.link}`} className="text-xl text-primary">
        {/* Background color fallback */}
        {tile?.cor && (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: tile.cor }}
          />
        )}

        {/* Imagem como fundo via <Image fill /> */}
        {tile?.imagem && (
          <Image
            src={tile.imagem.asset.url}
            alt={tileLabel ?? "tile"}
            fill
            className="object-cover"
            unoptimized
          />
        )}

        {/* Rótulo */}
        {tileLabel &&
          (labelPos === "bottom-left" ? (
            <span className={labelClasses}>{tileLabel}</span>
          ) : (
            <span
              className={labelClasses}
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform:
                  size === "square-small" ? "rotate(180deg)" : undefined,
              }}
            >
              {tileLabel}
            </span>
          ))}
      </Link>
    </div>
  );
};