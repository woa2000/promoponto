export interface TileData {
  titulo: string;
  type: string;
  imagem?: {
    _type: string;
    asset: {
      _id: string;
      url: string;
    };
    url?: string; // opcional, caso queira acessar direto
  } | null;
  cor?: string;
  tipoLink?: string;  
  link?: string;
}
