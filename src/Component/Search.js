import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Div, H1, StyledLink, H2, Input, Button, Table, TH, TR } from './SearchStyledComp.js';

const petURL = "http://eulerity-hackathon.appspot.com/pets";
const emptyStr = "";

export default function Search() {
    const [inputTitle, setInputTitle] = useState("");
    const [inputKeywords, setInputKeywords] = useState("");
    const [post, setPost] = useState(null);
    const [searchData, setSearchData] = useState([]);
    const [checkBox, setCheckBox] = useState([]);

    const changeInputTitle = (e) => {
        e.preventDefault();
        const title = e.currentTarget.value;
        setInputTitle(title);
    }

    const changeInputKeywords = (e) => {
        e.preventDefault();
        const keywords = e.currentTarget.value;
        setInputKeywords(keywords);
    }

    const changeCheckBoxInput = (e) => {
        console.log(e.currentTarget.checked);
        var cbList = checkBox;
        const name = e.currentTarget.name;
        const checkValue = e.currentTarget.checked;
        cbList = cbList.filter(item => item.title !== name);
        cbList.push({
            title: name,
            checked: checkValue,
        });
        setCheckBox(cbList);
        console.log(cbList);
    }

    const searchResults = (e) => {
        e.preventDefault();
        var res;
        //conditionals needed to consider the case when one field is empty and should not be considered
        if (inputTitle === emptyStr && inputKeywords === emptyStr)
            res = [];
        else if (inputTitle === emptyStr)
            res = post.filter(item => item.description.toUpperCase().includes(inputKeywords.toUpperCase()));
        else if (inputKeywords === emptyStr)
            res = post.filter(item => item.title.toUpperCase().includes(inputTitle.toUpperCase()));
        else {
            res = post.filter(item => item.description.toUpperCase().includes(inputKeywords.toUpperCase()) &&
                item.title.toUpperCase().includes(inputTitle.toUpperCase()));
        }
        setSearchData(res);
        initializeCheckBox(res);
    }

    useEffect(() => {
        axios.get(petURL).then((response) => {
            setPost(response.data);
            console.log(response.data);
        });
    }, []);

    const initializeCheckBox = (res) => {
        var cbList = [];
        res.map((item, i) => {
            cbList.push({
                title: item.title,
                checked: false,
            });
        });
        setCheckBox(cbList);
        console.log("cbList");
        console.log(cbList);
    }

    const changeSelection = (e, val) => {
        e.preventDefault();
        var cbList = [];
        checkBox.map((item) => {
            cbList.push({
                title: item.title,
                checked: val,
            });
        });
        setCheckBox(cbList);
    }

    const downaloadSelected = (e) => {
        e.preventDefault();
        checkBox.map((item) => {
            if (item.checked) {
                window.open(
                    searchData.filter(sItem => sItem.title == item.title)[0].url
                );
            }
        });
    }
 
    return (
        <Div>
            <H1>
                Search Engine for Pets<br />
                <StyledLink to="/Gallery">Gallery</StyledLink>
            </H1>
            <H2>Input information below to search pictures of cute pets.</H2>
            <div>Image title:
                <Input onChange={changeInputTitle} value={inputTitle} name="title"/>
            </div>
            <div>Keywords:
                <Input onChange={changeInputKeywords} value={inputKeywords} name="keywords"/>
            </div>
            <Button onClick={(e) => searchResults(e)}>Search</Button>
            <H2 style={searchData.length != 0 ? {display: "none"} : {visibility: "normal"}}>
                No pictures found/no search input.
            </H2>
            <div style={searchData.length == 0 ? {display: "none"} : {visibility: "normal"}} >
                <H2>
                    Search Results
                    <Button onClick={(e) => changeSelection(e, true)}>Select All</Button>
                    <Button onClick={(e) => changeSelection(e, false)}>Clear Selection</Button>
                    <Button onClick={(e) => downaloadSelected(e)}>Download Selected</Button>
                </H2>
                <H2 small>{searchData.length} pictures found.</H2>
                <Table>
                    <thead>
                        <TR header>
                            <TH col1>Information</TH>
                            <TH>Image</TH>
                            <TH col3>Selection</TH>
                        </TR>
                    </thead>
                    <tbody>
                        {searchData.map((item, i) => {
                            return(
                                <TR key={i}>
                                    <TH col1>
                                        <span style={{ fontSize: "20px" }}>{item.title}</span>
                                        <br />{item.description}
                                    </TH>
                                    <TH><img src={item.url} style={{ display: "block", width: "80%", marginLeft: "auto", marginRight: "auto" }} /></TH>
                                    <TH col3>
                                        <input type="checkbox" onChange={changeCheckBoxInput} name={item.title} 
                                            checked={checkBox.filter(cb => cb.title === item.title)[0].checked}/>
                                        <br />
                                        <a href={item.url} download className="downloadLinks" target="_blank">Download</a>
                                    </TH>
                                </TR>
                            )}
                        )}   
                    </tbody>   
                </Table>
            </div>
        </Div>
    );
}