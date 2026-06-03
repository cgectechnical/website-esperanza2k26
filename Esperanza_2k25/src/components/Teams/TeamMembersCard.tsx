import { CardSpotlight } from "@/components/ui/card-spotlight";
import { TeamMember } from "@/interfaces/team.interface";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export function TeamMemebrsCard({ member }: { member: TeamMember }) {
  return (
    <CardSpotlight className="max-w-96 rounded-2xl px-4 py-2">
      <h1 className="text-xl text-yellow-200 text-wrap font-bold relative z-20 mt-2">
        {member.name}
      </h1>
      <h1 className="text-xl text-wrap relative z-20 mt-2 text-white">
        {member.year + " " + member.department}
      </h1>
      <div className="text-neutral-200 mt-2 relative z-20">
        {member.avatar ? (
          <Image
            src={member.avatar}
            alt="image"
            className="w-[300px] p-4 h-[250px] object-cover rounded-2xl"
            width={300}
            height={250}
            priority
          />
        ) : (
          <div className="w-[300px] p-4 h-[250px] bg-gray-800 rounded-2xl flex items-center justify-center">
            <span className="text-white">No Photo</span>
          </div>
        )}
      </div>
      <p className="text-neutral-300 text-xl mt-2 relative z-20 capitalize">
        {member.lead || (member.role ? member.role : (member.category?.[0] ? member.category[0] + " Team" : "Team Member"))}
      </p>
      <div className="flex justify-center gap-5 my-3 relative z-20">
        {member.socials?.map((s,i) => {
          let icon = null;
          if (s.handler === "Facebook") {
            icon = <FaFacebook size={35} color="white"/>;
          } else if (s.handler === "Instagram") {
            icon = <FaInstagram size={35} color="white"/>;
          } else if (s.handler === "Github") {
            icon = <FaGithub size={35} color="white"/>;
          } else {
            icon = <FaLinkedin size={35} color="white"/>;
          }
          
          const normalizedLink = s.link && !s.link.startsWith("http") 
            ? `https://${s.link.replace(/^\/+/, "")}` 
            : s.link;
            
          return <Link target="_blank" key={i} href={normalizedLink}>{icon}</Link>;
        })}
      </div>
    </CardSpotlight>
  );
}
