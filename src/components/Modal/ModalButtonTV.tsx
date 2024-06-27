"use client"

import { Episode, PDZ_midia, Season } from "@/entities/PDZ_midia";
import { useEffect, useState } from "react";

interface ModalButtonTVProps {
  modalId?: number;
  midia?: PDZ_midia;
}

const ModalButtonTV: React.FC<ModalButtonTVProps> = ({ modalId = 0, midia = {} as PDZ_midia }) => {
  const [episodeIndex, setEpisodeIndex] = useState(0);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    if (midia.seasons) {
      setSeasons(midia.seasons);
      if (midia.seasons.length > 0) {
        setEpisodes(midia.seasons[0].episodes);
      }
    }
  }, [midia.seasons]);

  const handleChangeSeason = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSeasonIndex = parseInt(event.target.value, 10);
    const selectedSeason = seasons[selectedSeasonIndex];
    setEpisodes(selectedSeason ? selectedSeason.episodes : []);
    setEpisodeIndex(0);
  };

  const handleChangeEpisode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEpisodeIndex(parseInt(event.target.value, 10));
  };

  return (
    <>
      <div className={`seasons-${modalId}`}>
        <select onChange={handleChangeSeason} className="select btn-outline btn-primary w-full max-w-xs">
          {seasons.map((season, index) => (
            <option key={index} value={index}>
              {season.name}
            </option>
          ))}
        </select>
      </div>

      <div className={`episodes-${modalId}`}>
        <select onChange={handleChangeEpisode} className="select btn-outline btn-primary w-full max-w-xs">
          {episodes.map((episode, index) => (
            <option key={index} value={index}>
              {episode.name}
            </option>
          ))}
        </select>
      </div>

      <div className="d-flex justify-content-center">
        <a
          href={episodes[episodeIndex]?.magnetLink || ''}
          target="_blank"
          className={`btn btn-outline btn-success page-button button-download-id${modalId}`}
          role="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
          </svg>
          Baixar
        </a>
      </div>
    </>
  );
};

export default ModalButtonTV;
