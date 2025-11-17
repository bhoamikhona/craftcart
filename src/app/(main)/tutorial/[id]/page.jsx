  import { tutorials } from "@/data/tutorials";
  import { users } from "@/data/users";
  import { products as allProducts } from "@/data/products";
  import TutorialVideo from "@/components/tutorial/TutorialVideo";
  import TutorialInfoCard from "@/components/tutorial/TutorialInfoCard";
  import AuthorBox from "@/components/tutorial/AuthorBox";
  import SuppliesCard from "@/components/tutorial/SuppliesCard";
  import TutorialSteps from "@/components/tutorial/TutorialSteps";


  export default async function TutorialPage({ params }) {
    const { id } = await params; 
    const tutorialId = parseInt(id);
    const tutorial = tutorials.find((t) => t.id === tutorialId);

    if (!tutorial) return <p>Tutorial not found</p>;

    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-3 gap-8 px-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <TutorialVideo video={tutorial.video} thumbnails={tutorial.thumbnails} />
            <TutorialInfoCard tutorial={tutorial} />
            <AuthorBox authorId={tutorial.creatorId} />
            <TutorialSteps steps={tutorial.steps} />
          </div>

          <SuppliesCard products={tutorial.products} />

        </div>
      </div>
    );
  }
