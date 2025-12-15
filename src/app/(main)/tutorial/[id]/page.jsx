import supabase from "@/lib/supabaseClient";
import TutorialVideo from "@/components/tutorial/TutorialVideo";
import TutorialInfoCard from "@/components/tutorial/TutorialInfoCard";
import AuthorBox from "@/components/tutorial/AuthorBox";
import SuppliesCard from "@/components/tutorial/SuppliesCard";
import TutorialSteps from "@/components/tutorial/TutorialSteps.jsx";

export default async function TutorialPage({ params }) {
  const { id } = await params;

  // Load tutorial by tutorial_id
  const { data: tutorial, error } = await supabase
    .from("tutorials")
    .select("*")
    .eq("tutorial_id", id)
    .single();

  if (error || !tutorial) return <p>Tutorial not found</p>;

  // Load creator details
  const { data: creator } = await supabase
    .from("users")
    .select("*")
    .eq("id", tutorial.creator_id)
    .single();

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-3 gap-8 px-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <TutorialVideo
            video={tutorial.video_url}
            thumbnails={[tutorial.thumbnail_url]}
          />

          <TutorialInfoCard
            tutorial={{
              id: tutorial.tutorial_id,
              title: tutorial.title,
              description: tutorial.description,
              duration: tutorial.duration,
              views: tutorial.likes || 0,
            }}
          />

          <AuthorBox author={creator} />
          <TutorialSteps
            steps={
              tutorial.steps || [
                {
                  stepNumber: 1,
                  title: "Step 1",
                  description: "Step 1 Description",
                },
                {
                  stepNumber: 2,
                  title: "Step 2",
                  description: "Step 2 Description",
                },
              ]
            }
          />
        </div>

        <SuppliesCard products={[]} />
      </div>
    </div>
  );
}
