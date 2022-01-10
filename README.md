# module federation for bops demo

例子采用 5 个应用。  
`main` 为主应用，使用 `react 17` + `single-spa` + `module federation` 聚合多个子应用（`dashboard` `app1` `app2` `app3`）。  
`dashboard` 作为工作台，通过 `module federation` 将业务应用（`app1` `app2` `app3`）提供的业务组件引入到页面中，供用户自主布局使用。  
`app1` 采用 `react 16` + `ant design`。  
`app2` 采用 `react 16` + `semi design`。  
`app3` 采用 `react 18` + `ant design`。  

## 安装

例子采用多包管理，请使用 `pnpm`。

```sh
pnpm install
```

## 运行

```sh
pnpm run dev --parallel
```

访问 [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
