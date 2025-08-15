import {
  Carousel as CarouselComponent,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CarouselProps {
  children: React.ReactNode[];
}

export const Carousel = ({ children }: CarouselProps) => {
  return (
    <CarouselComponent
      opts={{ align: "start" }}
      orientation="vertical"
      className="max-w-2xl"
    >
      <CarouselContent className="h-[450px]">
        {children.map((child, index) => (
          <CarouselItem
            key={index}
            className="flex justify-center items-center"
          >
            <div className="max-h-[450px] overflow-hidden rounded-lg">
              {child}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </CarouselComponent>
  );
};
