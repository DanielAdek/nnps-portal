import { Watch } from  'react-loader-spinner'

import './loading.css';

export const Loading = () => {
  return (
    <div className={"loading-container"}>
      <div className={"backdrop"}></div>
      <Watch
        height="80"
        width="80"
        radius="48"
        color="#4fa94d"
        ariaLabel="watch-loading"
        wrapperStyle={{justifyContent: "center"}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  )
}