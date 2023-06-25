import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { sdk } from "@/lib/sdk";
import { gql } from "graphql-request";
import { Badge } from "@/components/ui/badge";

gql`
  query Media($id: Int) {
    Media(id: $id) {
      id
      description
      title {
        romaji
      }
      coverImage {
        large
      }
      streamingEpisodes {
        title
        thumbnail
        url
      }
      tags {
        id
        name
      }
    }
  }
`;

export default async function Page({ params }: { params: { id: string } }) {
  const result = await sdk.Media({ id: Number(params.id) });

  const media = result.Media;

  if (!media) {
    return <div>Not found</div>;
  }

  return (
    <Card className="w-1/2 max-md:w-full max-md:m-5 mx-auto">
      <Image
        src={media.coverImage?.large ?? ""}
        alt="banner"
        width={2048}
        height={2048}
        className="w-full lg:float-right lg:w-1/2"
      />
      <CardHeader>
        <CardTitle>{media.title?.romaji}</CardTitle>
        <span>
          {media.tags?.filter(Boolean).map((tag) => (
            <Badge className="mr-1" key={tag.id}>
              {tag.name}
            </Badge>
          ))}
        </span>
        <CardDescription
          dangerouslySetInnerHTML={{ __html: media.description ?? "" }}
        />
      </CardHeader>
      <CardContent>
        <div className="clear-right" />
      </CardContent>
    </Card>
  );
}
