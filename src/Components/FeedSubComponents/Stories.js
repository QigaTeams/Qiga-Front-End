import React from 'react'
import "../../css/stories.css";
import "../../css/global.css";
import pp1 from "../../images/pp_1.png";
import pp2 from "../../images/pp_2.png";

export default function Stories() {
    return (
        <div class="stories-wrapper">
            <ul id="story-container">
                <li class="story">
                    <img src={pp1} class="story-image" alt="Stories from All Followed"/>
                    <p class="story-user-name">You</p>
                </li>
                <li class="story">
                    <img src={pp2} class="story-image" alt="Stories from All Followed"/>
                </li>
                <li class="story">
                    <img src={pp1} class="story-image" alt="Stories from All Followed"/>
                </li>
                <li class="story">
                    <img src={pp2} class="story-image" alt="Stories from All Followed"/>
                </li>
                <li class="story">
                    <img src={pp1} class="story-image" alt="Stories from All Followed"/>
                </li>
                <li class="story">
                    <img src={pp2} class="story-image" alt="Stories from All Followed"/>
                </li>
                <li class="story">
                    <img src={pp1} class="story-image" alt="Stories from All Followed"/>
                </li>
                <li class="story">
                    <img src={pp2} class="story-image" alt="Stories from All Followed"/>
                </li>
                <li class="story">
                    <img src={pp2} class="story-image" alt="Stories from All Followed"/>
                </li>
                <li class="story">
                    <img src={pp1} class="story-image" alt="Stories from All Followed"/>
                </li>
                <li class="story">
                    <img src={pp2} class="story-image" alt="Stories from All Followed"/>
                </li>
                <li class="story">
                    <img src={pp2} class="story-image" alt="Stories from All Followed"/>
                </li>
                <li class="story">
                    <img src={pp1} class="story-image" alt="Stories from All Followed"/>
                </li>
                <li class="story">
                    <img src={pp2} class="story-image" alt="Stories from All Followed"/>
                </li>
            </ul>
        </div>
    )
}
