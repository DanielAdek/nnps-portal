import { Watch } from  'react-loader-spinner'

import './loading.css';

export const Loading = () => {
  return (
    <div>
      <div className={"backdrop"}></div>
      <Watch
        height="100"
        width="100"
        radius="9"
        color="#4fa94d"
        ariaLabel="watch-loading"
        wrapperStyle={{justifyContent: "center"}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  )
}