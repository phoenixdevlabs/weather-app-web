"use client";

import { useCallback, useState } from "react";
import "./page.scss";

import {
    WeatherIcon,
    weatherIconsDetails,
    weatherIconsList,
} from "@/lib/weather/reactIcons";

export default function IconsListPage() {
    const [keyword, setKeyword] = useState("");

    const filteredIcons = useCallback(() => {
        let filteredOut = weatherIconsList;

        keyword.split(",").forEach((kw) => {
            const trimmedKw = kw.trim();
            if (!trimmedKw) return;

            filteredOut = filteredOut.filter((icon) => {
                return (
                    weatherIconsDetails[icon].name
                        .toLowerCase()
                        .includes(trimmedKw.toLowerCase()) ||
                    weatherIconsDetails[icon].category
                        .toLowerCase()
                        .includes(trimmedKw.toLowerCase())
                );
            });
        });

        return filteredOut;
    }, [keyword]);

    return (
        <div className="icons-list-page">
            <header className="icons-list-page__header">
                <h2>All Weather Icons</h2>
                <input
                    className="icons-list-page__header__input"
                    placeholder="Filter by name or category (comma separated)"
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </header>
            <div className="icons-list">
                {filteredIcons().map((icon) => {
                    return (
                        <div className="icons-list__item" key={icon}>
                            <div className="icons-list__item__header">
                                <p>{weatherIconsDetails[icon].name}</p>
                                <p>({weatherIconsDetails[icon].category})</p>
                            </div>
                            <div className="icons-list__item__icon">
                                <WeatherIcon icon={icon} size={96} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
