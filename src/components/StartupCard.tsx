import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Users, Eye, TrendingUp } from "lucide-react";
import useAxios from "../hooks/useAxios";

interface StartupCardProps {
  startup: {
    _id: string;
    companyName: string;
    industry: string;
    location: string;
    teamSize: number;
    pitch: string;
    fundingStage: string;
    logo?: string;
    banner?: string;
    views?: {
      total: number;
      unique: number;
    };
  };
}

export function StartupCard({ startup }: StartupCardProps) {
  const navigate = useNavigate();
  const { execute } = useAxios();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      await execute({
        method: "POST",
        url: `/api/applications/${startup._id}/views`,
      });
      navigate(`/startups/${startup._id}`);
    } catch (error) {
      console.error("Failed to increment views:", error);
      navigate(`/startups/${startup._id}`);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <Link
      to={`/startups/${startup._id}`}
      onClick={handleClick}
      className="block group hover:shadow-lg transition-shadow duration-200"
    >
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
        <div className="relative h-48">
          <img
            src={
              startup.banner ||
              "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80"
            }
            alt={`${startup.companyName} banner`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80";
            }}
          />
          <div className="absolute top-4 left-4">
            <img
              src={startup.logo || "https://via.placeholder.com/60"}
              alt={`${startup.companyName} logo`}
              className="w-12 h-12 rounded-lg bg-white p-1 shadow-md"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/60";
              }}
            />
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
                {startup.companyName}
              </h3>
              <p className="text-sm text-gray-500">{startup.location}</p>
            </div>
            <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
              {startup.fundingStage
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </span>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2">{startup.pitch}</p>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" />
              <span>{startup.teamSize} team members</span>
            </div>
            {/* <div className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>{startup.industry}</span>
            </div> */}
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-gray-400" />
              <span>{formatNumber(startup.views?.total || 0)} views</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
