import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import {
  FactualMoment,
  OpenaiService,
  TranscriptSegment,
} from './openai.service';
import { YoutubeService } from 'src/youtube/youtube.service';

interface GetTranscriptBody {
  youtubeLink: string;
}

@Controller('openai')
export class OpenaiController {
  constructor(
    private readonly svc: OpenaiService,
    private readonly youtubeService: YoutubeService,
  ) {}

  @Get('ping')
  async ping() {
    return { ok: true, reply: await this.svc.ping() };
  }

  @Post('test/info')
  async testInfo(@Body() body: { facts: FactualMoment[] }) {
    // const facts: FactualMoment[] = [
    //   {
    //     t: 14400,
    //     t_hms: '04:00:00.000',
    //     span: [14400, 28349], // <--- CORRIGIDO: Agora é uma tupla de 2 números
    //     span_hms: ['04:00:00.000', '07:52:29.000'],
    //     quote:
    //       'não tem teto de gasto para financiamento da dívida pública ou seja isso é tirar o povo do orçamento',
    //     kind: 'categorical',
    //   },
    //   // ... (o restante dos objetos)
    // ];

    // Chame a função passando o array 'facts' como argumento
    const information = await this.svc.searchInfoContext(body.facts);
    console.log(information);

    // Exemplo de retorno, ajustado para o novo teste
    return { information };
  }

  // Recebe uma lista plana de segmentos (start,end,text)
  @Post('facts')
  async facts(
    @Body() body: { segments: TranscriptSegment[]; language?: 'pt' | 'en' },
  ) {
    const moments = await this.svc.findFactualMomentsFromTranscript(
      body.segments || [],
      body.language || 'pt',
    );
    return { moments };
  }

  // Recebe o formato Sections do YouTube
  @Post('facts/sections')
  async factsFromSections(@Body() { youtubeLink }: GetTranscriptBody) {
    if (!youtubeLink) {
      throw new BadRequestException(
        'youtubeLink is required in the request body.',
      );
    }
    // Regex para extrair o ID do vídeo do YouTube
    // Suporta formatos como:
    // https://www.youtube.com/watch?v=TOB80XGcf-Q
    // https://youtu.be/TOB80XGcf-Q
    // https://www.youtube.com/embed/TOB80XGcf-Q
    // e URLs com parâmetros adicionais
    const videoIdMatch = youtubeLink.match(
      /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/,
    );

    if (!videoIdMatch || !videoIdMatch[1]) {
      throw new BadRequestException('Invalid YouTube link provided.');
    }

    const videoId = videoIdMatch[1];

    const moments = {
      moments: [
        {
          t: 14400,
          t_hms: '04:00:00.000',
          span: [14400, 28349],
          span_hms: ['04:00:00.000', '07:52:29.000'],
          quote:
            'gastos não não vai que vai crescer uma cozinha só não tem teto de gasto para financiamento da dívida pública ou seja isso é tirar o povo do orçamento e depois você colocar 500 bilhões de reais por ano bons banqueiro ou no bolso',
          kind: 'quantitative',
        },
        {
          t: 83320,
          t_hms: '23:08:40.000',
          span: [83320, 97960],
          span_hms: ['23:08:40.000', '27:12:40.000'],
          quote:
            'por exemplo quando você tem no Brasil um governante e ele tem o poder de mais de poder determinar uma licença as regulações só lembra do Eike Batista o grande campeão nacional ele não fez um monte de empresa eram acho que umas 5 ou 6 empresas',
          kind: 'quantitative',
        },
        {
          t: 97960,
          t_hms: '27:12:40.000',
          span: [97960, 109710],
          span_hms: ['27:12:40.000', '30:28:30.000'],
          quote:
            '6 empresas nunca tinha tirado uma gota de óleo mesmo assim ele era um bilionário e até mais',
          kind: 'categorical',
        },
        {
          t: 97960,
          t_hms: '27:12:40.000',
          span: [97960, 109710],
          span_hms: ['27:12:40.000', '30:28:30.000'],
          quote:
            'o governo brasileiro tinha uma relação muito Estreita com esse cara dava dinheiro fazer o financiamento emprestava dava concessão',
          kind: 'event',
        },
        {
          t: 163100,
          t_hms: '45:18:20.000',
          span: [163100, 175430],
          span_hms: ['45:18:20.000', '48:43:50.000'],
          quote:
            'eu tô falando de polícia de gasto governamental de 2 3 trilhões de dólares',
          kind: 'quantitative',
        },
        {
          t: 175430,
          t_hms: '48:43:50.000',
          span: [175430, 188410],
          span_hms: ['48:43:50.000', '52:20:10.000'],
          quote:
            'não falo de desse nível de já é um milhão eu senti foi aparecer pra empresa pois não lembro uma renúncia fiscal para empresa não foi nesse nível é isso é isso é dia de pinga fogo é dois milhões de dólares três milhões de dólares para investimento em ciência e tecnologia',
          kind: 'quantitative',
        },
        {
          t: 215700,
          t_hms: '59:55:00.000',
          span: [215700, 245650],
          span_hms: ['59:55:00.000', '68:14:10.000'],
          quote:
            'que quer o celular né sabe onde foi inventado isso complexo sua amiga e dar para a cama agência agência de americano que que vende computador internet complexo Industrial militar americano',
          kind: 'event',
        },
        {
          t: 265639,
          t_hms: '73:47:19.000',
          span: [265639, 282610],
          span_hms: ['73:47:19.000', '78:30:10.000'],
          quote:
            'você sabe que o que uma que uma uma uma invenção uma uma inovação tem 0.3 porcento de chance de dar certo',
          kind: 'quantitative',
        },
        {
          t: 298090,
          t_hms: '82:48:10.000',
          span: [298090, 311409],
          span_hms: ['82:48:10.000', '86:30:09.000'],
          quote:
            'o próprio Santos Dumont colocava o dinheiro do bolso dele mas você 9 anos 9 anos anos prejuízo ele dentro do bolso do financiamento',
          kind: 'quantitative',
        },
        {
          t: 324730,
          t_hms: '90:12:10.000',
          span: [324730, 335800],
          span_hms: ['90:12:10.000', '93:16:40.000'],
          quote:
            'o Facebook por exemplo cara já falam abertamente eu sou obrigada a passar todos os meus dados para o governo americano',
          kind: 'categorical',
        },
      ],
    };

    try {
      // const transcript = await this.youtubeService.getTranscript(videoId);
      // console.log('TRANSCRIPT', transcript);
      // const moments = await this.svc.findFactualMomentsFromSections(
      //   transcript,
      //   'pt',
      // );
      return moments;
    } catch (error) {
      console.error(
        `Error in getTranscriptHandler for video ${videoId}:`,
        error,
      );
      throw new InternalServerErrorException(
        'Failed to retrieve transcript. Please try again later.',
      );
    }
  }
}
