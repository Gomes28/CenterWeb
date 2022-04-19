import { useState, ChangeEvent, FormEvent } from 'react'
import Head from 'next/head';
import styles from '../../product/styles.module.scss';
import {Header} from '../../../components/Header'

import { canSSRAuth } from '../../../utils/canSSRAuth'

import { FiUpload } from 'react-icons/fi'

import { setupAPIClient } from '../../../services/api'

import { toast } from 'react-toastify'

type ItemProps = {
  id: string;
  name: string;
}

interface CategoryProps{
  categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps){

  const [categories, setCategories] = useState(categoryList || [])
  const [categorySelected, setCategorySelected] = useState(0)


  function handleFile(e: ChangeEvent<HTMLInputElement>){

    if(!e.target.files){
      return;
    }

  }

  //Quando você seleciona uma nova categoria na lista
  function handleChangeCategory(event){
    // console.log("POSICAO DA CATEGORIA SELECIONADA ", event.target.value)
   //console.log('Categoria selecionada ', categories[event.target.value])

    setCategorySelected(event.target.value)

  }

  return(
    <>
      <Head>
        <title>Novo produto - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header/>

        <main className={styles.container}>
          <h1>Categorias</h1>

          <form className={styles.form}>

            <span onChange={handleChangeCategory} style={{color: '#fff', fontSize: 20, padding: 20 , borderWidth: 2, borderColor: '#111'}}>
                {categories.map( (item, index) => {
                  return(
                    <option key={item.id} value={index}>
                      {item.name}
                    </option>
                  )
                })}
            </span> 

          </form>

        </main>

      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apliClient = setupAPIClient(ctx)

  const response = await apliClient.get('/category');
  //console.log(response.data);

  return {
    props: {
      categoryList: response.data
    }
  }
})