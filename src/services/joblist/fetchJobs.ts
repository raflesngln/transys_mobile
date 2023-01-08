import axios from 'axios';

const FetchJobLists = async (props: any) => {
  const pencarian = props.search == null ? '' : props.search;
  let token = props.token;

  let configParams = {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    params: {
      page: props.page,
      per_page: props.perpage,
      sortby: props.sortby,
      sortbytype: props.sortbytype,
      search: pencarian,
    },
  };

  const res = await axios.get(
    // `${process.env.NEXT_PUBLIC_API_URL}/api/company`,
    `https://localhost/api/company`,
    configParams,
  );
  return res?.data;
};

export default FetchJobLists;