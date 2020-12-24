import React from 'react';
import {IconMeet} from './icon';

import {PostTypeGoogleMeet} from './post_type_google_meet';
import {createPost} from 'mattermost-redux/actions/posts';


class MattermostGoogleMeetPlugin {
  initialize(registry, store) {
      registry.registerChannelHeaderButtonAction(
          <IconMeet />,
          (channel) => this.startCall(channel.id)(store.dispatch, store.getState),
          "Start Google Meet call"
      );
      
      registry.registerPostTypeComponent('custom_google_meet', PostTypeGoogleMeet);
  }

  startCall(channelId) {
    return async (dispatch, getState) => {
      const callName = this.uuidv4()
      const url = `http://g.co/meet/${callName}`;

      // Open a window?
      // window.open(url);

      const post = {
        create_at: Date.now(),
        user_id: getState().entities.users.currentUserId,
        channel_id: channelId,
        message: `I have started a meeting: [${url}](${url})`,
        type: 'custom_google_meet',
        props: {
          call_name: callName,
          meeting_link: url
        },
      };

      // Based on https://qiita.com/kaakaa_hoe/items/fd10c58b00c43ae3cc3c#registerchannelheaderbuttonaction
      return await dispatch(createPost(post));
    }
  }

  /**
   * Public Domain/MIT
   * https://stackoverflow.com/a/8809472/1524997
   */
  uuidv4() { 
    var d = new Date().getTime(); // Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
}


window.registerPlugin('google-meet-plugin', new MattermostGoogleMeetPlugin());