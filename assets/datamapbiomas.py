import pandas as pd

# Carregar o dataframe a partir de um arquivo CSV
df = pd.read_csv('public/assets/municipio_guaraquecaba.csv')
classIds = {
    3 : "'Formação Florestal'",
    4 : "'Formação Savânica'",
    5 : "'Mangue'",
    49 : "'Restinga Florestal'",
    11 : "'Área Úmida Natural não Florestal'",
    12 : "'Formação Campestre'",
    32 : "'Apicum'",
    29 : "'Afloramento Rochoso'",
    13 : "'Outra Formação não Florestal'",
    18 : "'Agricultura'",
    39 : "'Soja'",
    20 : "'Cana'",
    40 : "'Arroz'",
    41 : "'Outras Lavouras Temporárias'",
    46 : "'Café'",
    47 : "'Citrus'",
    48 : "'Outras Lavaouras Perenes'",
    9 : "'Silvicultura'",
    15 : "'Pastagem'",
    21 : "'Mosaico de Agricultura ou Pastagem'",
    22 : "'Área não Vegetada'",
    23 : "'Praia e Duna'",
    24 : "'Infraestrutura Urbana'",
    30 : "'Mineração'",
    25 : "'Outra Área não Vegetada'",
    33 : "'Rio, Lago e Oceano'",
    31 : "'Aquicultura'",
}
df =df.replace({"class": classIds})
# Criar uma pasta para salvar os arquivos CSV divididos
import os
output_dir = 'public/assets/mapbiomas/guaraquecaba'
os.makedirs(output_dir, exist_ok=True)

# Agrupar o dataframe pela coluna 'id' e salvar cada grupo como um arquivo CSV separado
for id_val, group in df.groupby('id'):
    # Gerar o nome do arquivo CSV para cada grupo
    file_name = f'{output_dir}/mapbiomas_guaraquecaba_{id_val}.csv'
    
    # Salvar o grupo em um arquivo CSV
    group.to_csv(file_name, index=False)

print(f'Arquivos CSV divididos por id foram salvos na pasta {output_dir}')
