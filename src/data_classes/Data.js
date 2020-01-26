'use strict'
import Host from './Host';
import Topic from './Topic';
/**
 * Data.js
 * 
 * This class aggregates & organizes all the config data
 * and is in charge of R/W to the config file
 * @author Julie Lee
 */
export default class Data {
    /**
     * Stores initial data & turns it into Host & Topic instances
     * @param {*} data data object (stored in master.json)
     */
    constructor(data) {
        this.data = data;
        this.hosts = new Array();
        this.topics = new Array();
        this.data.hosts.forEach(name => {
            let newHost = new Host(name);
            this.hosts.push(newHost);
        });
        this.data.topics.forEach(topic => {
            let newTopic = new Topic(topic);
            this.topics.push(newTopic);
            if(topic.paradigm === "pubsub") {
                let pub = this.hosts.find(host => 
                    host.getName() === topic.pub
                );
                let pi = this.hosts.indexOf(pub);
                this.hosts[pi].addPubTopic(topic.id);
                topic.sub.forEach(sub => {
                    let s = this.hosts.find(host => 
                        host.getName() === sub
                    );
                    let si = this.hosts.indexOf(s);
                    this.hosts[si].addSubTopic(topic.id);
                });
            }
        });
    }

    getHosts() { return this.hosts; }
    getTopics() { return this.topics; }
}