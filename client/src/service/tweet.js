export default class TweetService {
 // 네트워크를 통해 데이터 가져오기 시작
  constructor(http){
    this.http = http;
  }

  async getTweets(username) {
    const query = username ? `?username=${username}` : '';
    return this.http.fetch(`/tweets${query}`, {
      method: 'GET'
    });                // fetch 메소드 ? :: async 14줄부터 계속
  }

  async postTweet(text) {
    return this.http.fetch(`/tweets`, {
      method: 'POST',
      body: JSON.stringify({text, username:'김사과', name:'apple'})
    });
  }
  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'DELETE'
    });
  }
  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'PUT',
      body: JSON.stringify({text})
    });
  }
}