import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr';
import axios from 'axios';
export default function App({ Component, pageProps }: AppProps) {
  // axios.defaults.baseURL = "http://localhost:3095/api";
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api";
  // 쿠키를 전송하고 받기 위한 설정
  axios.defaults.withCredentials = true;
  // swr에서 axios를 사용하기 위한 설정
  const fetcher = async (url: string) => {
    try{
        const res = await axios.get(url);
        return res.data;
    }catch(err: any){
        throw err.response.data;
    }
}
  return(
    <SWRConfig value={{fetcher}}>
      <Component {...pageProps} />
    </SWRConfig>
  )
}
