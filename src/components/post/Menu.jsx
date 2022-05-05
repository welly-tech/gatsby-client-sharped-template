import { AnchorLink } from "gatsby-plugin-anchor-links"
import React from "react"
import PropTypes, { any } from "prop-types"

const MenuCard = props => {
  return (
    <div className="p-6 mt-12 bg-gray-100 text-gray-700 sm:mt-16 sm:p-12">
      {props.children}
    </div>
  )
}

const SubMenu = ({ slug, menu }) => {
  const curSubMenu = menu.subContent.map((subMenu, idx) => (
    <MenuItem key={idx} slug={slug} menu={subMenu} />
  ))

  return (
    <>
      <MenuItem slug={slug} menu={menu} />
      <ul className="space-y-3 list-inside ml-6 list-disc">{curSubMenu}</ul>
    </>
  )
}

const MenuItem = ({ slug, menu }) => {
  return (
    <li>
      <AnchorLink
        to={`${slug}${menu.id}`}
        stripHash
        className="underline underline-offset-4"
      >
        {menu.content}
      </AnchorLink>
    </li>
  )
}

const MenuItems = ({ curMenu, slug }) =>
  React.createElement(curMenu.subContent.length === 0 ? MenuItem : SubMenu, {
    slug,
    menu: curMenu,
  })

const Menu = ({ slug, menuData }) => {
  const menu = menuData.map((curMenu, idx) => (
    <MenuItems key={`menuItem-${idx}`} curMenu={curMenu} slug={slug} />
  ))
  return (
    <MenuCard>
      <h2 className="text-center leading-normal tracking-wide font-bold text-2xl gradient">
        快速跳轉目錄
      </h2>
      <ul className="space-y-3 mt-8 text-lg leading-normal list-decimal list-inside">
        {menu}
      </ul>
    </MenuCard>
  )
}

MenuCard.propTypes = {
  children: any,
}

SubMenu.propTypes = {
  slug: PropTypes.string,
  menu: PropTypes.object,
}

MenuItem.propTypes = {
  slug: PropTypes.string,
  menu: PropTypes.object,
}

MenuItems.propTypes = {
  curMenu: PropTypes.object,
  slug: PropTypes.string,
}

Menu.propTypes = {
  slug: PropTypes.string,
  menuData: PropTypes.array,
}
export default Menu
