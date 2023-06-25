import MediaCard from "@/components/MediaCard";
import { sdk } from "@/lib/sdk";
import { gql } from "graphql-request";

const query = gql`
  query Anime {
    Page(page: 1) {
      media(isAdult: false, isLicensed: true) {
        ...MediaCard
      }
    }
  }
`;

export default async function Home() {
  const result = await sdk.Anime();

  return (
    <main className="flex flex-wrap gap-5 items-center">
      {result.Page?.media?.filter(Boolean).map((media) => (
        <MediaCard key={media.id} media={media} />
      ))}
    </main>
  );
}
