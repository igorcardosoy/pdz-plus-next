import { ReactNode, useState } from "react";
import SeasonEps from "./SeasonEps";
import { Episode, PDZ_midia, Season } from "@/entities/PDZ_midia";
import { sendTvToPDZ } from "@/utils/requests";

const FormAddTvMidia = () => {

    const [seasonsQuantity, setSeasonsQuantity] = useState(1);
    const [seasons] = useState([] as ReactNode[]);

    const addSeason = () => {
        setSeasonsQuantity(seasonsQuantity + 1);
        seasons.push(<SeasonEps key={seasonsQuantity} seasonNum={seasonsQuantity} />);
    }

    const removeSeason = () => {
        if (seasonsQuantity > 1) {
            setSeasonsQuantity(seasonsQuantity - 1);
            seasons.pop();
        }
    }

    const handleSubmitForm = (e: any) => {
        e.preventDefault();

        const selectedMidia = document.querySelector('.bg-primary');

        const tmdbId: number | any = selectedMidia?.id;
        const tmdbTitle: string | any = selectedMidia?.querySelector('.media_title')?.textContent;
        const tmdbType: string | any = selectedMidia?.querySelector('.media_type')?.textContent;

        const filters = [] as string[];

        (document.querySelector('#filters')?.querySelectorAll('input') as NodeList).forEach((input: any) => {
            if (input.checked) {
                filters.push(String(input.value));
            }
        });

        const midia: PDZ_midia = new PDZ_midia(tmdbTitle, tmdbId, tmdbType, filters);
    
        (document.querySelector('#seasons')?.querySelectorAll('.alert') as NodeList).forEach((season: any) => {
            const episodes = [] as Episode[];

            (season.querySelectorAll('.episode-input') as NodeList).forEach((episode: any, index: number) => {
                console.log(episode);
                let episodeName = episode.querySelector('.episode-name')?.value;
                if (episodeName === "") {
                    episodeName = "Episódio " + (index + 1); 
                }

                let episodeLink = episode.querySelector('.episode-link')?.value;
                episodes.push({ name: episodeName, magnetLink: episodeLink });

            });

            let seasonName = season.querySelector('.season-name')?.value;

            if (seasonName === "") {
                seasonName = "Temporada " + (midia.getSeasonsQuantity() + 1);
            }

            const seasonEpisodes = episodes.length;

            let seasonN: Season = new Season(seasonName, seasonEpisodes);

            episodes.forEach((episode) => {
                seasonN.addEpisode(episode);
            } );
 
            midia.addSeason(seasonN);
        });

        sendTvToPDZ(midia);

        window.location.href = '/home';
    }

    return (
        <div>

            <form onSubmit={handleSubmitForm}>
                <section id="seasons">
                    {seasons.map((season) => {
                        return season;
                    })}
                </section>

                <section className="flex flex-wrap items-center justify-center w-96 items-center gap-5">
                    <button onClick={addSeason} id="add-season" type="button" className="btn btn-primary w-36">Adicionar Temporada</button>
                    <button onClick={removeSeason} id="remove-season" type="button" className="btn btn-primary w-36">Remover Temporada</button>
                    <button id="send-movie" type="submit" className="btn btn-success w-1/2">Enviar</button>
                </section>
            </form>



        </div>
    )
}

export default FormAddTvMidia