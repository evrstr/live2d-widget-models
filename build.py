import os
from os import read
import json
from PIL import Image
# 设置参数
pil_x = 500
pil_y = 500
quality = 100
# Live2DViewerEX读取.json文件后生成的图片是时间命名的,此函数用于将预览图片转换为目录名称,同时将model.json重命名


def my_rename():
    dirname = os.getcwd() + "\\live2d_evrstr"
    items = os.listdir(dirname)
    file = open('dat.json', 'w', encoding='utf-8')
    my_list = []
    for item in items:
        dat_item = {}
        path = os.path.join(dirname, item)
        if os.path.isdir(path):
            item1 = os.listdir(path)
            for itemone in item1:
                pathres = os.path.join(path, itemone)
                if os.path.isfile(pathres) and pathres.endswith('.png') and (not (pathres.endswith('.pil.png'))):
                    path_name = path.split('\\')[-1]
                    now_name = path + '\\' + path_name + '.png'
                    preview = 'https://cdn.jsdelivr.net/gh/evrstr/live2d-widget-models/live2d_evrstr/' + \
                        path_name + '/' + path_name + '.pil.png'
                    json_src = 'https://cdn.jsdelivr.net/gh/evrstr/live2d-widget-models/live2d_evrstr/' + \
                        path_name + '/' + 'model.json'

                    try:
                        os.rename(pathres, now_name)
                    except:
                        print("重命名png失败!!!")
                    try:
                        img = Image.open(now_name)
                        out = img.resize((pil_x, pil_y), Image.ANTIALIAS)
                        out.save(path + '\\' + path_name +
                                 '.pil.png', quality=quality)
                    except:
                        print("重设图片大小失败!!!")
                    dat_item['name'] = path_name
                    dat_item['preview'] = preview
                    dat_item['json'] = json_src
                    print(dat_item)
                    print('-----------------------')
                    my_list.append(dat_item)
                if os.path.isfile(pathres) and (pathres.endswith('model.json') or pathres.endswith('model3.json')):
                    path_name = path.split('\\')[-1]
                    now_name = path + '\\' + 'model.json'
                    try:
                        os.rename(pathres, now_name)
                    except:
                        print("重命名json失败!!!")

    file.write(json.dumps(my_list))
    file.close()


# 生成索引markdown文件


def create_md():
    file = open('README.md', 'w', encoding='utf-8')
    file_list = open('dat.json', 'r', encoding='utf-8')
    file.write('''  # Live2D 模型收藏

    本仓库内所有收集的Live2D版权均属于他对应的公司、组织。不得将投入任何形式的商业用途！

    ---------------- ''')
    file.write('\r')
    # lines = file_list.readlines()
    data = json.load(file_list)
    for i in data:
        file.write('# ' + str(data.index(i)) + '.' + i['name'] + '  ')
        file.write('\r')
        file.write('![' + i['name'] + '图像](' + i['preview'] + ')  ')
        file.write('\r')
        file.write('**json文件地址:**  \r' + '> ' + i['json'] + '  ')
        file.write('\r')
    file.close()


if __name__ == "__main__":
    my_rename()
    create_md()
