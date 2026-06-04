import { Component } from '@angular/core';
import { Playlists } from './components/playlists/playlists';

@Component({
  selector: 'app-library',
  imports: [Playlists],
  templateUrl: './library.html',
})
export class Library {
  protected readonly playlists = [
    {
      id: 'pl-001',
      name: 'Red Hot Chili Pipes',
      description: 'High-energy open-source funk rock and stream configurations.',
      creationdate: '2026-01-15',
      user_id: 'usr-9921',
      user_name: 'Lena',
      tracks: [
        {
          count: '1',
          id: 'trk-101',
          position: '1',
          name: 'The Power of Equality',
          duration: '243',
          license_ccurl: 'https://creativecommons.org/licenses/by/4.0/',
          audio: 'https://example.com/audio/power-of-equality.mp3',
          audiodownload: 'https://example.com/audio/download/power-of-equality.mp3',
          audiodownload_allowed: true,
        },
        {
          count: '2',
          id: 'trk-102',
          position: '2',
          name: 'If You Have to Ask',
          duration: '217',
          license_ccurl: 'https://creativecommons.org/licenses/by/4.0/',
          audio: 'https://example.com/audio/if-you-have-to-ask.mp3',
          audiodownload: 'https://example.com/audio/download/if-you-have-to-ask.mp3',
          audiodownload_allowed: true,
        },
        {
          count: '3',
          id: 'trk-103',
          position: '3',
          name: 'Breaking the Girl',
          duration: '295',
          license_ccurl: 'https://creativecommons.org/licenses/by-nc/4.0/',
          audio: 'https://example.com/audio/breaking-the-girl.mp3',
          audiodownload: 'https://example.com/audio/download/breaking-the-girl.mp3',
          audiodownload_allowed: true,
        },
      ],
    },
    {
      id: 'pl-002',
      name: 'Zoneless Grooves',
      description: 'Pure asynchronous background loops optimized for deep focus.',
      creationdate: '2026-02-20',
      user_id: 'usr-9921',
      user_name: 'Lena',
      tracks: [
        {
          count: '1',
          id: 'trk-201',
          position: '1',
          name: 'Around the World',
          duration: '238',
          license_ccurl: 'https://creativecommons.org/licenses/by-sa/4.0/',
          audio: 'https://example.com/audio/around-the-world.mp3',
          audiodownload: '',
          audiodownload_allowed: false,
        },
        {
          count: '2',
          id: 'trk-202',
          position: '2',
          name: 'Parallel Universe',
          duration: '270',
          license_ccurl: 'https://creativecommons.org/licenses/by-sa/4.0/',
          audio: 'https://example.com/audio/parallel-universe.mp3',
          audiodownload: '',
          audiodownload_allowed: false,
        },
      ],
    },
    {
      id: 'pl-003',
      name: 'OnPush Harmonies',
      description: 'Predictable, immutable frequencies tailored for structural stability.',
      creationdate: '2026-03-05',
      user_id: 'usr-0412',
      user_name: 'Alex',
      tracks: [
        {
          count: '1',
          id: 'trk-301',
          position: '1',
          name: 'By the Way',
          duration: '217',
          license_ccurl: 'https://creativecommons.org/publicdomain/zero/1.0/',
          audio: 'https://example.com/audio/by-the-way.mp3',
          audiodownload: 'https://example.com/audio/download/by-the-way.mp3',
          audiodownload_allowed: true,
        },
      ],
    },
  ];
}
