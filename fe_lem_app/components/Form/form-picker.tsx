"use client";

import Link from "next/link";
import Image from "next/image";
import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Input } from "@nextui-org/react";
import { cn } from "@/lib/utils";
import { unsplash } from "@/services/unsplash-service";
import { defaultImages } from "@/public/defaultImages/images";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
  setUrlImg: any;
}

export const FormPicker = ({ id, errors, setUrlImg }: FormPickerProps) => {
  const pending = false;
  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     // try {
  //     //   const result = await unsplash.photos.getRandom({
  //     //     collectionIds: ["317099"],
  //     //     count: 9,
  //     //   });

  //     //   if (result && result.response) {
  //     //     const newImages = (result.response as Array<Record<string, any>>);
  //     //     setImages(newImages);
  //     //   } else {
  //     //   }
  //     // } catch (error) {
  //     //   setImages(defaultImages);
  //     // } finally {
  //     //   setIsLoading(false);
  //     // }
  //   };

  //   fetchImages();
  // }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="mb-2 grid grid-cols-3 gap-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "bg-muted group relative aspect-video cursor-pointer transition hover:opacity-75",
              pending && "cursor-auto opacity-50 hover:opacity-50",
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
              setUrlImg(image.urls.full);
            }}
          >
            <Input
              id={id}
              type="radio"
              disabled={pending}
              checked={selectedImageId === image.id}
              className="hidden"
              value={image.urls.full}
            />
            {/* <input       
              {...register("imageUrl")}                  
              type="radio"
              id={id}
              className="hidden"
              checked={selectedImageId === image.id}
              disabled={pending}
              value={image.urls.full}  
            /> */}
            <Image
              src={image.urls.thumb}
              alt="Unsplash image"
              className="rounded-sm object-cover"
              fill
              sizes="(min-width: 768px) 50vw, (min-width: 375px) 33.3vw, 100vw"
            />
            {selectedImageId === image.id && (
              <div className="absolute inset-y-0 flex h-full w-full items-center justify-center bg-black/30">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
            <Link
              href={image.links.html}
              target="_blank"
              className="absolute bottom-0 w-full truncate bg-black/50 p-1 text-[10px] text-white opacity-0 hover:underline group-hover:opacity-100"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
