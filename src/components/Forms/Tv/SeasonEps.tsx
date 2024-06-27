import { ReactNode, useState } from "react";
import EpisodeInput from "./EpisodeInput";

const SeasonEps = ({ seasonNum = 0 as number }) => {

    const [episodesQuantity, setEpisodesQuantity] = useState(0);
    const [episodes] = useState([] as ReactNode[]);

    const handleEpChange = (event: any) => {
        episodes.splice(0, episodes.length);
        setEpisodesQuantity(event.target.value);

        console.log(event.target.value);

        for (let index = 0; index < event.target.value; index++) {
            episodes.push(<EpisodeInput key={seasonNum + '-' + index} episodeNum={index+1} />);
        }
    }

    return (
        <div className="mb-3 flex flex-col gap-2 alert bg-neutral shadow-lg w-96" id={"season-" + seasonNum}>
            <h1 className="">Temporada {seasonNum}</h1>
            <section className="flex flex-wrap row items-center justify-center w-80 items-center mb-5 gap-1">
                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" fill="currentColor" className="bi bi-card-text" viewBox="0 0 16 16">
                        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                        <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
                    </svg>
                    <input type="text" className="grow w-24 season-name" placeholder="Nome" />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-4 w-4  bi bi-collection-play-fill" viewBox="0 0 16 16">
                        <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zm6.258-6.437a.5.5 0 0 1 .507.013l4 2.5a.5.5 0 0 1 0 .848l-4 2.5A.5.5 0 0 1 6 12V7a.5.5 0 0 1 .258-.437" />
                    </svg>
                    <input onChange={handleEpChange} type="number" className="grow w-24" placeholder="Num de Ep" />
                </label>
            </section>


            <section id="episodes">
                {
                    episodes.map((episode) => {
                        return episode;
                    })
                }
            </section>
        </div>
    )
}

export default SeasonEps