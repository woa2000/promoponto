import Image from "next/image";

interface ServiceIconProps {
  label: string;
  description: string;
  icon: string;
}


const ServiceIcon: React.FC<ServiceIconProps> = ({ label, description, icon }) => (
  <div className="flex flex-col items-center w-[120px] group cursor-pointer relative" style={{ minHeight: 140 }}>
    {/* Imagem: visível normalmente, oculta no hover */}
    <div className="bg-white rounded-full h-[120px] w-[120px] flex items-center justify-center shadow-md mb-2 transition-opacity duration-200 group-hover:opacity-0">
      <Image
        src={icon}
        alt={label}
        width={50}
        height={50}
        className="object-contain"
      />
    </div>
    {/* Descrição: oculta normalmente, visível no hover, mesma estrutura da div da imagem */}
    {description && (
      <div className="bg-white rounded-full h-[120px] w-[120px] flex items-center justify-center shadow-md mb-2 absolute top-0 left-1/2 -translate-x-1/2 transition-opacity duration-200 opacity-0 group-hover:opacity-100 z-10">
        <span className="text-[12px] text-brand-purple font-semibold leading-[14px] text-center px-2">
          {description}
        </span>
      </div>
    )}
    <span className="text-[14px] text-brand-lime font-bold leading-[18px] mt-2">{label}</span>
  </div>
);

export default ServiceIcon;
