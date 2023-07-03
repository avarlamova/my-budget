import React from 'react'
import {categoriesIcons} from '../../features/categories/constants'
import styles from './IconPicker.module.scss'

//TODO remove any
const IconPicker = ({onIconChange}: any) => {
    return (
        <div className={styles.wrapper}>
             {categoriesIcons.map((icon: string) => {
                const iconName = `mdi mdi-${icon}`
                return (
                    <i onClick={onIconChange} key={icon} className={iconName}></i>
                )
              })}          
        </div>
    )
}

export default IconPicker

