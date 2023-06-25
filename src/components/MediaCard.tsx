"use client";

import { gql } from "graphql-request";
import { MediaCardFragment } from "@/generated/graphql";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

gql`
  fragment MediaCard on Media {
    __typename
    id
    title {
      romaji
    }
    coverImage {
      medium
    }
  }
`;

export default function MediaCard({ media }: { media: MediaCardFragment }) {
  return (
    <Card className="w-56">
      <CardHeader>
        <CardTitle>{media.title?.romaji}</CardTitle>
      </CardHeader>
      <CardContent>
        <Link href={`/media/${media.id}`}>
          <Image
            src={media.coverImage?.medium ?? ""}
            alt="banner"
            width={512}
            height={512}
          />
        </Link>
      </CardContent>
    </Card>
  );
}
