# scraper


## Para rodar a api de scraper do tik tok certifique-se de que tem instalado todas as dependências necessárias e execute o comando node src/index.js

## Dados da API - Tiktok

A API retorna os seguintes dados do usuário:

| Campo            | Descrição                                           |
|------------------|-----------------------------------------------------|
| nickname         | Nome de usuário (nickname)                          |
| avatarThumb      | URL da miniatura do avatar                          |
| secUid           | ID de segurança do usuário (secUid)                 |
| signature        | Assinatura do usuário                               |
| uniqueId         | ID único do usuário                                 |
| verified         | Verificado (true se verificado, false caso contrário)|
| diggCount        | Contagem de curtidas                               |
| followerCount    | Contagem de seguidores                              |
| followingCount   | Contagem de pessoas seguidas                        |
| friendCount      | Contagem de amigos                                  |
| heartCount       | Contagem de corações (likes)                       |
| videoCount       | Contagem de vídeos publicados                       |

Aqui estão os campos relacionados à lista de vídeos:

| Campo            | Descrição                                           |
|------------------|-----------------------------------------------------|
| collectCount     | Contagem de coleções (favoritos)                   |
| commentCount     | Contagem de comentários                            |
| diggCount        | Contagem de curtidas no vídeo                      |
| playCount        | Contagem de visualizações do vídeo                 |
| shareCount       | Contagem de compartilhamentos do vídeo              |
| desc             | Descrição do vídeo                                  |

## Dados da API - Instagram

A API retorna os seguintes dados do usuário:

| Campo        | Descrição                                           |
|--------------|-----------------------------------------------------|
| posts        | Número de posts do usuário                         |
| followers    | Número de seguidores do usuário                    |
| following    | Número de pessoas que o usuário segue              |

Aqui estão os campos relacionados à lista de posts:

| Campo              | Descrição                                             |
|--------------------|-------------------------------------------------------|
| id                 | ID do post                                           |
| shortcode          | Código curto do post                                 |
| type               | Tipo de post (GraphImage, vídeo, etc.)               |
| is_video           | Indica se o post é um vídeo (true/false)             |
| dimension          | Dimensões do post (largura x altura)                 |
| display_url        | URL da imagem ou vídeo do post                       |
| thumbnail_src      | URL da miniatura do post                             |
| owner              | Informações do proprietário do post                  |
| description        | Descrição do post                                    |
| comments           | Número de comentários no post                        |
| likes              | Número de curtidas no post (-1 se não disponível)    |
| comments_disabled  | Indica se os comentários estão desativados (true/false) |
| taken_at_timestamp | Timestamp da data de publicação do post              |
| location           | Informações de localização do post                   |
| hashtags           | Lista de hashtags mencionadas no post                |
| mentions           | Lista de usuários mencionados no post                |
| tagged_users       | Lista de usuários marcados no post                   |

## Dados da API - Youtube

A API fornece os seguintes dados sobre o canal:

| Campo             | Descrição                                        |
|-------------------|--------------------------------------------------|
| videoCount        | Número de vídeos do canal                        |
| viewCount         | Contagem total de visualizações do canal         |
| subscriberCount   | Contagem de inscritos do canal                   |

Aqui estão os campos relacionados à lista de vídeos na playlist:

| Campo       | Descrição                                    |
|-------------|----------------------------------------------|
| title       | Título do vídeo na playlist                  |
| statistics  | Estatísticas do vídeo na playlist            |

Dentro de "statistics", você encontra os seguintes campos:

| Campo          | Descrição                               |
|----------------|-----------------------------------------|
| viewCount      | Contagem de visualizações do vídeo      |
| likeCount      | Contagem de curtidas no vídeo           |
| favoriteCount  | Contagem de marcações como favorito     |
| commentCount   | Contagem de comentários do vídeo        |


