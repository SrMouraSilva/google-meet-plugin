// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License for license information.

import React from 'react';

import {IconMeet} from './icon';

import {makeStyleFromTheme} from 'mattermost-redux/utils/theme_utils';


/**
 * Based on https://github.com/mattermost/mattermost-plugin-zoom
 */
export class PostTypeGoogleMeet extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

    render() {
      const style = getStyle(this.props.theme);
      const post = this.props.post;
      const props = post.props || {};

      const preText = `I have started a meeting`;
      const title = 'Google Meet';
      const subtitle = `Call name: ${props.call_name}`;
      const content = (
        <a
          className='btn btn-lg btn-primary'
          style={style.button}
          rel='noopener noreferrer'
          target='_blank'
          href={props.meeting_link}
        >
          <IconMeet />
          {'JOIN MEETING'}
        </a>
      );

      return (
        <div className='attachment attachment--pretext'>
          <div className='attachment__thumb-pretext'>
              {preText}
          </div>
          <div className='attachment__content'>
            <div className='clearfix attachment__container'>
              <h5 className='mt-1' style={style.title}>
                {title}
              </h5>
              {subtitle}
              <div>
                <div style={style.body}>{content}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

const getStyle = makeStyleFromTheme((theme) => {
    return {
        body: {
            overflowX: 'auto',
            overflowY: 'hidden',
            paddingRight: '5px',
            width: '100%',
        },
        title: {
            fontWeight: '600',
        },
        button: {
            fontFamily: 'Open Sans',
            fontSize: '12px',
            fontWeight: 'bold',
            letterSpacing: '1px',
            lineHeight: '19px',
            marginTop: '12px',
            borderRadius: '4px',
            color: theme.buttonColor,
        },
        buttonIcon: {
            paddingRight: '8px',
            fill: theme.buttonColor,
        },
        summary: {
            fontFamily: 'Open Sans',
            fontSize: '14px',
            fontWeight: '600',
            lineHeight: '26px',
            margin: '0',
            padding: '14px 0 0 0',
        },
        summaryItem: {
            fontFamily: 'Open Sans',
            fontSize: '14px',
            lineHeight: '26px',
        },
    };
});
