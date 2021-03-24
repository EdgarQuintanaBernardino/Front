import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

const Colors = () => import('@/views/theme/Colors')
const Typography = () => import('@/views/theme/Typography')

const Charts = () => import('@/views/charts/Charts')
const Widgets = () => import('@/views/widgets/Widgets')

// Views - Components
const Cards = () => import('@/views/base/Cards')
const Switches = () => import('@/views/base/Switches')
const Tabs = () => import('@/views/base/Tabs')
const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
const Carousels = () => import('@/views/base/Carousels')
const Collapses = () => import('@/views/base/Collapses')
const Jumbotrons = () => import('@/views/base/Jumbotrons')
const ListGroups = () => import('@/views/base/ListGroups')
const Navs = () => import('@/views/base/Navs')
const Navbars = () => import('@/views/base/Navbars')
const Paginations = () => import('@/views/base/Paginations')
const Popovers = () => import('@/views/base/Popovers')
const ProgressBars = () => import('@/views/base/ProgressBars')
const Tables = () => import('@/views/tables/Tables')
const AdvancedTables = () => import('@/views/tables/AdvancedTables')
const LazyLoadingTables = () => import('@/views/tables/LazyLoadingTables')
const LazyLoadingTablesScroll = () => import('@/views/tables/LazyLoadingTablesScroll')

const Tooltips = () => import('@/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Editors
const TextEditors = () => import('@/views/editors/TextEditors')
const CodeEditors = () => import('@/views/editors/CodeEditors')

// Views - Forms
const BasicForms = () => import('@/views/forms/Forms')
const AdvancedForms = () => import('@/views/forms/AdvancedForms')
const ValidationForms = () => import('@/views/forms/ValidationForms')

// Views GoogleMaps
const GoogleMaps = () => import('@/views/GoogleMaps')

// Views - Icons
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')
const Brands = () => import('@/views/icons/Brands')
const Flags = () => import('@/views/icons/Flags')

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts')
const Badges = () => import('@/views/notifications/Badges')
const Modals = () => import('@/views/notifications/Modals')
const Toaster = () => import('@/views/notifications/Toaster')


// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')
const EditUser = () => import('@/views/users/EditUser')

//Notes
const Notes = () => import('@/views/notes/Notes')
const Note = () => import('@/views/notes/Note')
const EditNote = () => import('@/views/notes/EditNote')
const CreateNote = () => import('@/views/notes/CreateNote')

// Plugins
const Draggable = () => import('@/views/plugins/Draggable')
const Calendar = () => import('@/views/plugins/Calendar')
const Spinners = () => import('@/views/plugins/Spinners')

// Views - UI Kits
const Invoice = () => import('@/views/apps/invoicing/Invoice')
const Compose = () => import('@/views/apps/email/Compose')
const Inbox = () => import('@/views/apps/email/Inbox')
const Message = () => import('@/views/apps/email/Message')

//Roles
const Roles = () => import('@/views/roles/Roles')
const Role = () => import('@/views/roles/Role')
const EditRole = () => import('@/views/roles/EditRole')
const CreateRole = () => import('@/views/roles/CreateRole')

//Bread
const Breads = () => import('@/views/bread/Breads')
const Bread = () => import('@/views/bread/Bread')
const EditBread = () => import('@/views/bread/EditBread')
const CreateBread = () => import('@/views/bread/CreateBread')
const DeleteBread = () => import('@/views/bread/DeleteBread')

//Resources
const Resources = () => import('@/views/resources/Resources')
const CreateResource = () => import('@/views/resources/CreateResources')
const Resource = () => import('@/views/resources/Resource')
const EditResource = () => import('@/views/resources/EditResource')
const DeleteResource = () => import('@/views/resources/DeleteResource')

//Email
const Emails        = () => import('@/views/email/Emails')
const CreateEmail  = () => import('@/views/email/CreateEmail')
const EditEmail    = () => import('@/views/email/EditEmail')
const ShowEmail     = () => import('@/views/email/ShowEmail')
const SendEmail     = () => import('@/views/email/SendEmail')

const Menus       = () => import('@/views/menu/MenuIndex')
const CreateMenu  = () => import('@/views/menu/CreateMenu')
const EditMenu    = () => import('@/views/menu/EditMenu')
const DeleteMenu  = () => import('@/views/menu/DeleteMenu')

const MenuElements = () => import('@/views/menuElements/ElementsIndex')
const CreateMenuElement = () => import('@/views/menuElements/CreateMenuElement')
const EditMenuElement = () => import('@/views/menuElements/EditMenuElement')
const ShowMenuElement = () => import('@/views/menuElements/ShowMenuElement')
const DeleteMenuElement = () => import('@/views/menuElements/DeleteMenuElement')
const Media = () => import('@/views/media/Media')
////mis vistas
const profile = () => import('@/views/users/Profile')
const settings = () => import('@/views/users/Settings')
const users_users = () => import('@/views/users/user_user')
const empresas = () => import('@/views/empresas/empresas')
const prueba23 = () => import('@/views/users/Usersprueba')
const cuentas_bancarias = () => import('@/views/cuentas/cuentas')
const ingresos=()=>import('@/views/ingresos/ingresos')

Vue.use(Router)

let router = new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})


router.beforeEach((to, from, next) => {
  let roles = localStorage.getItem("roles");
  
  if(to.matched.some(record => record.meta.requiresAdmin)) {
    if(roles != null && roles=='admin'){
      next()
    }else{
      console.log(roles)
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    }
  }else if(to.matched.some(record => record.meta.requiresUser)) {
    if(roles != null && roles=='user'||roles=="admin"){
      next()
    }else{
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    }
  }else{
    next()
  }
})

export default router

function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      children: [
        {
          path: '/prueba23',
          name: 'prueba',
          component: prueba23
        },
        {
          path: '/settings',
          name: 'settings',
          component: settings
        },
        {
          path: '/contactos',
          name: 'Contactos',
          component: users_users
        },
        {
          path: '/cuentas_bancarias',
          name: 'Cuentas Bancarias',
          component: cuentas_bancarias
        },
        {
          path: '/incomes',
          name: 'Ingresos',
          component: ingresos
        },
        
        {
          path: '/empresas',
          name: 'Empresas',
          component: empresas
        },
        {
          path: 'media',
          name: 'Media',
          component: Media,
          meta:{
            requiresAdmin: true
          }
        },
        {
          path: '/profile',
          name: 'Profile',
          component: profile
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'colors',
          name: 'Colors',
          component: Colors,
          meta:{
            requiresUser: true
          }
        },
        {
          path: 'typography',
          name: 'Typography',
          component: Typography,
          meta:{
            requiresUser: true
          }
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts,
          meta:{
            requiresUser: true
          }
        },
        {
          path: 'tables',
          redirect: '/tables/tables',
          name: 'Tables',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'tables',
              name: 'Basic tables',
              component: Tables,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'advanced-tables',
              name: 'Advanced tables',
              component: AdvancedTables,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'lazy-loading-tables',
              name: 'Lazy loading tables',
              component: LazyLoadingTables,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'lazy-loading-tables-scroll',
              name: 'Lazy loading tables scroll',
              component: LazyLoadingTablesScroll,
              meta:{
                requiresUser: true
              }
            }
          ]
        },
        {
          path: 'widgets',
          name: 'Widgets',
          component: Widgets
        },
        {
          path: 'menu',
          meta: { label: 'Menu'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Menus,
              meta:{
                requiresAdmin: true
              }
            },
            {
              path: 'create',
              meta: { label: 'Create Menu' },
              name: 'CreateMenu',
              component: CreateMenu,
              meta:{
                requiresAdmin: true
              }
            },
            {
              path: ':id/edit',
              meta: { label: 'Edit Menu' },
              name: 'EditMenu',
              component: EditMenu,
              meta:{
                requiresAdmin: true
              }
            },
            {
              path: ':id/delete',
              meta: { label: 'Delete Menu' },
              name: 'DeleteMenu',
              component: DeleteMenu,
              meta:{
                requiresAdmin: true
              }
            },
          ]
        },
        {
          path: 'menuelement',
          meta: { label: 'MenuElement'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: ':menu/menuelement',
              component: MenuElements,
              meta:{
                requiresAdmin: true
              }
            },
            {
              path: ':menu/menuelement/create',
              meta: { label: 'Create Menu Element' },
              name: 'Create Menu Element',
              component: CreateMenuElement,
              meta:{
                requiresAdmin: true
              }
            },
            {
              path: ':menu/menuelement/:id',
              meta: { label: 'Menu Element Details'},
              name: 'Menu Element',
              component: ShowMenuElement,
              meta:{
                requiresAdmin: true
              }
            },
            {
              path: ':menu/menuelement/:id/edit',
              meta: { label: 'Edit Menu Element' },
              name: 'Edit Menu Element',
              component: EditMenuElement,
              meta:{
                requiresAdmin: true
              }
            },
            {
              path: ':menu/menuelement/:id/delete',
              meta: { label: 'Delete Menu Element' },
              name: 'Delete Menu Element',
              component: DeleteMenuElement,
              meta:{
                requiresAdmin: true
              }
            },
          ]
        },
        {
          path: 'users',
          meta: { label: 'Users'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Users,
              meta:{
                requiresAdmin: true
              }
            },
            {
              path: ':id',
              meta: { label: 'User Details'},
              name: 'User',
              component: User,
              meta:{
                requiresAdmin: true
              }
            },
            {
              path: ':id/edit',
              meta: { label: 'Edit User' },
              name: 'EditUser',
              component: EditUser,
              meta:{
                requiresAdmin: true
              }
            },
          ]
        },
        {
          path: 'notes',
          meta: { label: 'Notes'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Notes,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'create',
              meta: { label: 'Create Note' },
              name: 'CreateNote',
              component: CreateNote,
              meta:{
                requiresUser: true
              }
            },
            {
              path: ':id',
              meta: { label: 'Note Details'},
              name: 'Note',
              component: Note,
              meta:{
                requiresUser: true
              }
            },
            {
              path: ':id/edit',
              meta: { label: 'Edit Note' },
              name: 'EditNote',
              component: EditNote,
              meta:{
                requiresUser: true
              }
            },
          ]
        },
        {
          path: 'roles',
          meta: { label: 'Roles'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Roles,
              meta:{
                requiresAdmin: true
              }
            },
            {
              path: 'create',
              meta: { label: 'Create Role' },
              name: 'Create Note',
              component: CreateRole,
              meta:{
                requiresAdmin: true
              }
            },
            {
              path: ':id',
              meta: { label: 'Role Details'},
              name: 'Role',
              component: Role,
              meta:{
                requiresAdmin: true
              }
            },
            {
              path: ':id/edit',
              meta: { label: 'Edit Role' },
              name: 'Edit Role',
              component: EditRole,
              meta:{
                requiresAdmin: true
              }
            },
          ]
        },
        {
          path: 'bread',
          meta: { label: 'Bread'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Breads,
              meta:{
                requiresAdmin: true
              }
            },
            {
              path: 'create',
              meta: { label: 'Create Bread' },
              name: 'CreateBread',
              component: CreateBread,
              meta:{
                requiresAdmin: true
              }
            },
            {
              path: ':id',
              meta: { label: 'Bread Details'},
              name: 'Bread',
              component: Bread,
              meta:{
                requiresAdmin: true
              }
            },
            {
              path: ':id/edit',
              meta: { label: 'Edit Bread' },
              name: 'Edit Bread',
              component: EditBread,
              meta:{
                requiresAdmin: true
              }
            },
            {
              path: ':id/delete',
              meta: { label: 'Delete Bread' },
              name: 'Delete Bread',
              component: DeleteBread,
              meta:{
                requiresAdmin: true
              }
            },
          ]
        },
        {
          path: 'email',
          meta: { label: 'Emails'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Emails,
              meta:{
                requiresAdmin: true
              }
            },
            {
              path: 'create',
              meta: { label: 'Create Email Template' },
              name: 'Create Email Template',
              component: CreateEmail,
              meta:{
                requiresAdmin: true
              }
            },
            {
              path: ':id',
              meta: { label: 'Show Email Template'},
              name: 'Show Email Tempalte',
              component: ShowEmail,
              meta:{
                requiresAdmin: true
              }
            },
            {
              path: ':id/edit',
              meta: { label: 'Edit Email Tempalate' },
              name: 'Edit Email Template',
              component: EditEmail,
              meta:{
                requiresAdmin: true
              }
            },
            {
              path: ':id/sendEmail',
              meta: { label: 'Send Email' },
              name: 'Send Email',
              component: SendEmail,
              meta:{
                requiresAdmin: true
              }
            },
          ]
        },
        {
          path: 'resource',
          meta: { label: 'Resources'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: ':bread/resource',
              component: Resources,
            },
            {
              path: ':bread/resource/create',
              meta: { label: 'Create Resource' },
              name: 'CreateResource',
              component: CreateResource
            },
            {
              path: ':bread/resource/:id',
              meta: { label: 'Resource Details'},
              name: 'Resource',
              component: Resource,
            },
            {
              path: ':bread/resource/:id/edit',
              meta: { label: 'Edit Resource' },
              name: 'Edit Resource',
              component: EditResource
            },
            {
              path: ':bread/resource/:id/delete',
              meta: { label: 'Delete Resource' },
              name: 'Delete Resource',
              component: DeleteResource
            },
          ]
        },
        {
          path: 'base',
          redirect: '/base/cards',
          name: 'Base',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'breadcrumb',
              name: 'Breadcrumb',
              component: Breadcrumbs,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'cards',
              name: 'Cards',
              component: Cards,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'carousel',
              name: 'Carousel',
              component: Carousels,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'collapse',
              name: 'Collapse',
              component: Collapses,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'jumbotron',
              name: 'Jumbotron',
              component: Jumbotrons,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'list-group',
              name: 'List Group',
              component: ListGroups,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'navs',
              name: 'Navs',
              component: Navs,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'navbars',
              name: 'Navbars',
              component: Navbars,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'pagination',
              name: 'Pagination',
              component: Paginations,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'popovers',
              name: 'Popovers',
              component: Popovers,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'progress',
              name: 'Progress',
              component: ProgressBars,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'switches',
              name: 'Switches',
              component: Switches,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'tabs',
              name: 'Tabs',
              component: Tabs,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'tooltips',
              name: 'Tooltips',
              component: Tooltips,
              meta:{
                requiresUser: true
              }
            }
          ]
        },
        {
          path: 'buttons',
          redirect: '/buttons/standard-buttons',
          name: 'Buttons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'buttons',
              name: 'Standard Buttons',
              component: StandardButtons,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'button-group',
              name: 'Button Group',
              component: ButtonGroups,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'dropdowns',
              name: 'Dropdowns',
              component: Dropdowns,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'brand-buttons',
              name: 'Brand Buttons',
              component: BrandButtons,
              meta:{
                requiresUser: true
              }
            }
          ]
        },
        {
          path: 'editors',
          redirect: '/editors/text-editors',
          name: 'Editors',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'text-editors',
              name: 'Text Editors',
              component: TextEditors,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'code-editors',
              name: 'Code Editors',
              component: CodeEditors,
              meta:{
                requiresUser: true
              }
            }
          ]
        },
        {
          path: 'forms',
          redirect: '/forms/basic-forms',
          name: 'Forms',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'basic-forms',
              name: 'Basic Forms',
              component: BasicForms,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'advanced-forms',
              name: 'Advanced Forms',
              component: AdvancedForms,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'validation-forms',
              name: 'Form Validation',
              component: ValidationForms,
              meta:{
                requiresUser: true
              }
            }
          ]
        },
        {
          path: 'google-maps',
          name: 'Google Maps',
          component: GoogleMaps,
          meta:{
            requiresUser: true
          }
        },
        {
          path: 'icon',
          redirect: '/icon/coreui-icons',
          name: 'CoreUI Icons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'coreui-icons',
              name: 'Standard CoreUI Icons',
              component: CoreUIIcons,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'brands',
              name: 'Brands',
              component: Brands,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'flags',
              name: 'Flags',
              component: Flags,
              meta:{
                requiresUser: true
              }
            }
          ]
        },
        {
          path: 'notifications',
          redirect: '/notifications/alerts',
          name: 'Notifications',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'alerts',
              name: 'Alerts',
              component: Alerts,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'badge',
              name: 'Badge',
              component: Badges,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'modals',
              name: 'Modals',
              component: Modals,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'toaster',
              name: 'Toaster',
              component: Toaster,
              meta:{
                requiresUser: true
              }
            }
          ]
        },
        {
          path: 'plugins',
          redirect: '/plugins/draggable',
          name: 'Plugins',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'draggable',
              name: 'Draggable Cards',
              component: Draggable,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'calendar',
              name: 'Calendar',
              component: Calendar,
              meta:{
                requiresUser: true
              }
            },
            {
              path: 'spinners',
              name: 'Spinners',
              component: Spinners,
              meta:{
                requiresUser: true
              }
            }
          ]
        },
       
        {
          path: 'apps',
          name: 'Apps',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'invoicing',
              redirect: '/apps/invoicing/invoice',
              name: 'Invoicing',
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  path: 'invoice',
                  name: 'Invoice',
                  component: Invoice,
                  meta:{
                    requiresUser: true
                  }
                }
              ]
            },
            {
              path: 'email',
              redirect: '/apps/email/inbox',
              name: 'Email',
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  path: 'compose',
                  name: 'Compose',
                  component: Compose,
                  meta:{
                    requiresUser: true
                  }
                },
                {
                  path: 'inbox',
                  name: 'Inbox',
                  component: Inbox,
                  meta:{
                    requiresUser: true
                  }
                },
                {
                  path: 'message',
                  name: 'Message',
                  component: Message,
                  meta:{
                    requiresUser: true
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
      ]
    },
    {
      path: '/',
      redirect: '/login',
      name: 'Auth',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        },
      ]
    },
    {
      path: '*',
      name: '404',
      component: Page404
    }
  ]
}

