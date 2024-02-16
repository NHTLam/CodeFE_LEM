"use client";

import Link from "next/link";
import Image from "next/image";
import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Input } from "@nextui-org/react";
import { cn } from "@/lib/utils";
import { unsplash } from "@/lib/unsplash";
import { defaultImages } from "@/public/defaultImages/images";

import { FormErrors } from "./form-error";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
  setUrlImg: any;
};

export const FormPicker = ({
  id,
  errors,
  setUrlImg
}: FormPickerProps) => {
  const pending = false;
  const [images, setImages] = useState<Array<Record<string, any>>>(defaultImages);
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
  //     //     console.error("Failed to get images from Unsplash");
  //     //   }
  //     // } catch (error) {
  //     //   console.log(error);
  //     //   setImages(defaultImages);
  //     // } finally {
  //     //   setIsLoading(false);
  //     // }
  //   };

  //   fetchImages();
  // }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <div 
            key={image.id}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
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
              className="object-cover rounded-sm"
              fill  
              sizes="(min-width: 768px) 50vw, (min-width: 375px) 33.3vw, 100vw"
            />
            {selectedImageId === image.id && (
              <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
            <Link 
              href={image.links.html}
              target="_blank"
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors
        id="imageUrl"
        errors={errors}
      />
    </div>
  );
};