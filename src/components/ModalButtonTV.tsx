"use client"

import { useEffect, useState } from "react";

interface ModalButtonTVProps {
  modalId?: number;
  midia?: PDZ_midia;
}

const ModalButtonTV: React.FC<ModalButtonTVProps> = ({ modalId = 0, midia = {} as PDZ_midia }) => {
  const [seasonIndex, setSeasonIndex] = useState(0);
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
    setSeasonIndex(selectedSeasonIndex);
    const selectedSeason = seasons[selectedSeasonIndex];
    setEpisodes(selectedSeason ? selectedSeason.episodes : []);
    setEpisodeIndex(0);
  };

  const handleChangeEpisode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEpisodeIndex(parseInt(event.target.value, 10));
  };

  return (
    <div className="flex flex-wrap gap-3 text-center items-center justify-center">
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
          Baixar
        </a>
      </div>
    </div>
  );
};

export default ModalButtonTV;
