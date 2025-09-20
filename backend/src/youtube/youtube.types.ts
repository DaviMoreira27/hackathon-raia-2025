export interface TranscriptItem {
  start: number;
  end: number;
  text: string;
}

export interface Sections {
  sectionCount: number;
  sections: [
    {
      section: number;
      from: number;
      to: number;
      transcripts: TranscriptItem[];
    },
  ];
}

export interface YoutubeIntegrationRequest {
  context: {
    client: {
      clientName: 'WEB';
      clientVersion: string; //'2.2021111'
      screenPixelDensity: number;
      platform: 'DESKTOP';
      acceptHeader: string;
      originalUrl: string;
    };
  };
  params: string;
  languageCode: string;
}

export interface YoutubeIntegrationResponse {
  responseContext: {
    visitorData: string;
    serviceTrackingParams: {
      service: string;
      params: {
        key: string;
        value: string;
      }[];
    }[];
    mainAppWebResponseContext: {
      loggedOut: boolean;
    };
    webResponseContextExtensionData: {
      hasDecorated: boolean;
    };
  };
  actions: {
    clickTrackingParams: string;
    updateEngagementPanelAction: {
      targetId: string;
      content: {
        transcriptRenderer: {
          content: {
            transcriptSearchPanelRenderer: {
              body: {
                transcriptSegmentListRenderer: {
                  noResultLabel: {};
                  initialSegments: {
                    transcriptSegmentRenderer: {
                      startMs: string;
                      endMs: string;
                      snippet: {
                        runs: {
                          text: string;
                        }[];
                      };
                      startTimeText: {
                        simpleText: string;
                      };
                      trackingParams: string;
                      accessibility: {
                        accessibilityData: {
                          label: string;
                        };
                      };
                      targetId: string;
                    };
                  }[];
                };
              };
            };
          };
          footer: {
            transcriptFooterRenderer: {
              languageMenu: {
                sortFilterSubMenuRenderer: {
                  subMenuItems: {
                    title: string;
                    selected: boolean;
                    continuation: {
                      reloadContinuationData: {
                        continuation: string;
                        clickTrackingParams: string;
                      };
                    };
                    trackingParams: string;
                  }[];
                  trackingParams: string;
                };
              };
            };
          };
          trackingParams: string;
        };
      };
    };
  }[];
  trackingParams: string;
  error?: {
    code: number;
    message: string;
  };
}
