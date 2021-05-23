import axios from 'axios'
const module = {
  namespaced: true,//命名
    state: {
        playId:[''],
      },
      mutations: {
        playUrl(state, data) {
            state.playId = data
          }
    },
    
  actions: {
      // 页面通过playUrl传过来id进行axios请求
        playUrl(store,id)
        {
          axios(`https://autumnfish.cn/song/url?id=${id}`).then(
          (res) => {
              // console.log(res.data.data[0].url);
              store.commit('playUrl',res.data.data[0].url)
            }

        );
        }
    }
}
export default module