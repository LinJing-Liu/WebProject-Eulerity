import React from 'react';
import axios from "axios";
import { Div, H1, StyledLink, Li } from './SearchStyledComp.js';

const petURL = "http://eulerity-hackathon.appspot.com/pets";
//useEffect not functioning well, execute code prior to function declaration instead
var initPost = null;
axios.get(petURL).then((response) => {
    initPost = response.data;
    console.log(response.data);
});

export default function Gallery() {
    return (
        <Div>
            <H1>
                Gallery!<br />
                <StyledLink to="/">Search</StyledLink>
            </H1>
            <br style={{ margin: "20px" }}/>
            {initPost.map((item, i) => {
                return (
                    <Li key={i} gallery>
                        <a href={item.url} download target="_blank">
                            <img src={item.url} 
                                style={{ width: "300px", height: "400px", objectFit: "fill", margin: "20px" }}/>
                        </a>
                    </Li>
                )
            })}
        </Div>
    );
}