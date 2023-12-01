import Loading from "@/app/(dashboard)/loading";
import { LuLayers, LuUsers, LuRadioTower, LuListChecks, LuSearchCheck, LuCalculator, LuTarget, LuCheckCheck } from "react-icons/lu";

type Props = {
  totalTasks: number;
  totalEvents: number;
  totalClients: number;
  totalProjects: number;
};

export default async function Header({ totalTasks, totalEvents, totalClients, totalProjects }: Props) {
  return (
    <header className="mt-10">
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 grid-rows-1 gap-4">
        <div className="headerCard">
          <div className="p-7">
            <div className="headerCardCase">
              <div>
                <h5 className="text-sm">Total Tasks</h5>
                <span className="text-4xl font-medium">{totalTasks}</span>
              </div>
              <div className="headerCardIcon  ">
                <LuUsers />
              </div>
            </div>

            <div className="flex gap-2 mt-3 items-center">
              <span className="text-teal-500 text-sm">
                <LuSearchCheck />
              </span>
              <p className="text-xs text-colorBg/90 font-medium">Tracking the total number of tasks</p>
            </div>
          </div>
        </div>

        <div className="headerCard">
          <div className="p-7">
            <div className="headerCardCase">
              <div>
                <h5 className="text-sm">Total Events</h5>
                <span className="text-4xl font-medium">{totalEvents}</span>
              </div>
              <div className="headerCardIcon">
                <LuLayers />
              </div>
            </div>

            <div className="flex gap-2 mt-3 items-center">
              <span className="text-yellow-500 text-sm">
                <LuCalculator />
              </span>
              <p className="text-xs text-colorBg/90 font-medium">Sum of all events in calendar</p>
            </div>
          </div>
        </div>

        <div className="headerCard">
          <div className="p-7">
            <div className="headerCardCase">
              <div>
                <h5 className="text-sm">Total Clients</h5>
                <span className="text-4xl font-medium">{totalClients}</span>
              </div>
              <div className="headerCardIcon">
                <LuRadioTower />
              </div>
            </div>

            <div className="flex gap-2 mt-3 items-center">
              <span className="text-violet-500 text-sm">
                <LuTarget />
              </span>
              <p className="text-xs text-colorBg/90 font-medium">All clients that we have</p>
            </div>
          </div>
        </div>

        <div className="headerCard">
          <div className="p-7">
            <div className="headerCardCase">
              <div>
                <h5 className="text-sm">Total Projects</h5>
                <span className="text-4xl font-medium">{totalProjects}</span>
              </div>
              <div className="headerCardIcon">
                <LuListChecks />
              </div>
            </div>

            <div className="flex gap-2 mt-3 items-center">
              <span className="text-blue-500 text-sm">
                <LuCheckCheck />
              </span>
              <p className="text-xs text-colorBg/90 font-medium">Total of all projects</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
