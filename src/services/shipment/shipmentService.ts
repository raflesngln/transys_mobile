import axios from "axios";
import { useState, useEffect } from 'react';

import {BASE_URL} from '@services/variableKEY'


interface ShipmentParamType {
  token: string,
  halaman?: number,
  pid?: any | null,
  date: any | null,
  mawb: string,
  airlines: string,
  shipper?: boolean,
  consignee?: boolean,
  remark?: boolean,
  image_1?: any | null,
  image_2?: any | null,
  image_3?: any | null,
  bulk?: any | null,
}
interface dataBody{
  data:ShipmentParamType
}

const getAll = async ({ token, halaman }:any) => {
  const pencarian='';//(props.search==null)?"":props.search;
  let configParams = {
    headers: {'Authorization': 'Bearer '+token,'Content-Type':'application/json'},
    params: {
      page:'props.page',
      per_page:'props.perpage',
      sortby:'props.sortby',
      sortbytype:'props.sortbytype',
      search:pencarian
    },
  }

  const respon = await axios.get(`${BASE_URL}/overviews_list`,configParams);
  return respon?.data;
};

const create = async ({token,data,image_1,image_2,image_3}:any) => {
  const bodyText={
      "pid":data.pid,
      "date":data.date,
      "mawb":data.mawb,
      "airlines":data.airlines,
      "shipper":data.shipper,
      "consignee":data.consignee,
      "remark":data.remark,
      "image_1":image_1,
      "image_2":image_2,
      "image_3":image_3,
      "bulk":[
          {
          "pid" : data.mawb,
          "pid_header" : "testSSSS",
          "item_code" : "1234567890",
          "colly" : "3",
          "weight" : 20,
          "commodity" : "TESsss"
          }
      ]
    }
  
    // return bodyText;

  const responses=await axios({
        method: 'post',
        url:`${BASE_URL}/overflows`,
        headers: {'Authorization': 'Bearer '+token,'Content-Type':'application/json'}, 
        data:bodyText
      });

    return responses?.data;
};

function findById(){
  return 'data';
}

function update(){
  return 'data';
}
function deleteById(){
  return 'data';
}
function deleteAll(){
  return 'data';
}

export{
  getAll,
  create,
  findById,
  update,
  deleteById,
  deleteAll,
}