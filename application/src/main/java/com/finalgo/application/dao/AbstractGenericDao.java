package com.finalgo.application.dao;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.data.annotation.QueryAnnotation;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.io.Serializable;
import java.util.List;

@Service
@Repository
@Transactional
public abstract class AbstractGenericDao<T extends Serializable> {
    private Class<T> clazz;

    @PersistenceContext(type = PersistenceContextType.TRANSACTION)
    private EntityManager entityManager;

    public AbstractGenericDao() {
    }

    public AbstractGenericDao(Class<T> clazz) {
        this.clazz = clazz;
    }

    public T findOne(long id){
      return (T) getCurrentSession().get(clazz, id);
    }

    public List<T> findAll() {
        return getCurrentSession().createQuery("from " + clazz.getName()).list();
    }

    public T createOneItemSelectQuery(String query) {
        try {
            Query nativeQuery = getCurrentSession().createQuery(query);
            return (T) nativeQuery.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    public List<T> createSelectQuery(String query) {
        Query nativeQuery = getCurrentSession().createQuery(query);
        return nativeQuery.getResultList();
    }

    public T create(T entity) {
        getCurrentSession().saveOrUpdate(entity);
        return entity;
    }

    public T update(T entity) {
        return (T) getCurrentSession().merge(entity);
    }

    public void delete(T entity) {
        getCurrentSession().delete(entity);
    }

    public void deleteById(long entityId) {
        T entity = findOne(entityId);
        delete(entity);
    }

    protected Session getCurrentSession() {
        return entityManager.unwrap(Session.class);
    }


}