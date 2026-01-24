import { cn } from "@/lib/utils";

export function PlateVisual({ placa, className }: { placa: string, className?: string }) {
  return (
    <div className={cn(
      "relative w-64 h-32 bg-white rounded-xl border-4 border-gray-800 shadow-2xl flex flex-col items-center justify-center overflow-hidden",
      className
    )}>
      {/* Decoracion Superior */}
      <div className="absolute top-0 w-full h-8 bg-[#00796b] flex items-center justify-between px-4">
        <span className="text-[10px] font-bold text-white tracking-widest uppercase">México</span>
        <span className="text-[10px] font-bold text-white tracking-widest uppercase">Transporte Privado</span>
      </div>

      {/* Texto Placa - Dynamic Sizing */}
      {/* Texto Placa - Dynamic Sizing */}
      <div className={cn(
        "mt-4 font-mono font-black tracking-widest text-gray-900 drop-shadow-sm transition-all whitespace-nowrap",
        placa.length >= 8 ? "text-3xl" : placa.length >= 7 ? "text-4xl" : "text-5xl"
      )}>
        {placa.length > 3 && placa.indexOf('-') === -1
          ? `${placa.substring(0, 3)}-${placa.substring(3)}`
          : placa
        }
      </div>

      {/* Decoracion Inferior */}
      <div className="absolute bottom-1 w-full flex justify-center opacity-50">
        <div className="text-[8px] text-gray-500">DELANTERA</div>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none" />
    </div>
  );
}
