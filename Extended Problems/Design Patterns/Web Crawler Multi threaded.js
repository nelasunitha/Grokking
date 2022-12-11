/* Given a URL startUrl and an interface HtmlParser, implement a Multi-threaded web crawler to crawl all links that are under the same hostname as startUrl.

Return all URLs obtained by your web crawler in any order.

Your crawler should:

Start from the page: startUrl
Call HtmlParser.getUrls(url) to get all URLs from a webpage of a given URL.
Do not crawl the same link twice.
Explore only the links that are under the same hostname as startUrl.

As shown in the example URL above, the hostname is example.org. For simplicity's sake, you may assume all URLs use HTTP protocol without any port specified. For example, the URLs http://leetcode.com/problems and http://leetcode.com/contest are under the same hostname, while URLs http://example.org/test and http://example.com/abc are not under the same hostname.

The HtmlParser interface is defined as such:

interface HtmlParser {
  // Return a list of all urls from a webpage of given url.
  // This is a blocking call, that means it will do HTTP request and return when this request is finished.
  public List<String> getUrls(String url);
}
Note that getUrls(String url) simulates performing an HTTP request. You can treat it as a blocking function call that waits for an HTTP request to finish. It is guaranteed that getUrls(String url) will return the URLs within 15ms. Single-threaded solutions will exceed the time limit so, can your multi-threaded web crawler do better?

Below are two examples explaining the functionality of the problem. For custom testing purposes, you'll have three variables urls, edges and startUrl. Notice that you will only have access to startUrl in your code, while urls and edges are not directly accessible to you in code.



Example 1:



Input:
urls = [
  "http://news.yahoo.com",
  "http://news.yahoo.com/news",
  "http://news.yahoo.com/news/topics/",
  "http://news.google.com",
  "http://news.yahoo.com/us"
]
edges = [[2,0],[2,1],[3,2],[3,1],[0,4]]
startUrl = "http://news.yahoo.com/news/topics/"
Output: [
  "http://news.yahoo.com",
  "http://news.yahoo.com/news",
  "http://news.yahoo.com/news/topics/",
  "http://news.yahoo.com/us"
]
Example 2:



Input:
urls = [
  "http://news.yahoo.com",
  "http://news.yahoo.com/news",
  "http://news.yahoo.com/news/topics/",
  "http://news.google.com"
]
edges = [[0,2],[2,1],[3,2],[3,1],[3,0]]
startUrl = "http://news.google.com"
Output: ["http://news.google.com"]
Explanation: The startUrl links to all other pages that do not share the same hostname.


Constraints:

1 <= urls.length <= 1000
1 <= urls[i].length <= 300
startUrl is one of the urls.
Hostname label must be from 1 to 63 characters long, including the dots, may contain only the ASCII letters from 'a' to 'z', digits from '0' to '9' and the hyphen-minus character ('-').
The hostname may not start or end with the hyphen-minus character ('-').
See:  https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_hostnames
You may assume there're no duplicates in the URL library.


Follow up:

Assume we have 10,000 nodes and 1 billion URLs to crawl. We will deploy the same software onto each node. The software can know about all the nodes. We have to minimize communication between machines and make sure each node does equal amount of work. How would your web crawler design change?
What if one node fails or does not work?
How do you know when the crawler is done?*/
/*Currently LC doesn't let you solve this in Javascript but here's a simple demonstration of how you could solve this type of problem in JS. Now, the first thing to notice is that this problem isn't actually about multithreading! The actual problem we are dealing with here is asynchronous web communication rather than the problem of distributing a heavy CPU load evenly. This problem is something that NodeJS is actually quite specifically designed to solve, so the solution here is very easy.

Note that this solution has very little in common with the real world solution for writing a Distributed Web Crawler, in which case you could use a Distributed Set for visited (e.g. Redis), a Distributed Message Queue for the urlFrontier (e.g. RabbitMQ) and a Database for the result. This solution doesn't actually feature an explicit urlFrontier as it is implemented recursively, the urlFrontier exists solely on the call stack.*/

class Crawler {
    constructor (htmlParser) {
		// No mutex concerns for the collections as this is asychronous single-threaded code
        this.visited = new Set();
        this.result = [];
        this.htmlParser = htmlParser;
    }

    async startCrawl(url) {
        const hostname = this.getHostname(url);
        await this.crawl(url);
        return this.result;
    }

    async crawl(url) {
        // Check + add to visited URLs
        if(this.visited.has(url)) return;
		this.visited.add(url);
		// Add to result array
        this.result.push(url);

        const urls = await this.htmlParser.get(url);
        const promises = [];
        for(let url of urls) {
            if(this.getHostname(url) === this.hostname) {
                promises.push(this.crawl(url));
            }
        }
        return Promise.all(promises);
	}

    getHostname(url) {
        const thirdSlash = url.indexOf('/', 8);
        return thirdSlash !== -1 ? url.substring(0, thirdSlash): url;
    }
}